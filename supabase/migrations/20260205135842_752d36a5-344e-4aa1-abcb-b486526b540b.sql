-- Drop overly permissive policies
DROP POLICY IF EXISTS "Service role can manage IDs" ON public.agrilink_ids;
DROP POLICY IF EXISTS "Service role manages payments" ON public.payments;

-- Create proper RLS policies for agrilink_ids
-- Only allow marking as used during signup (handled by trigger)
CREATE POLICY "Users can view their own agrilink_id usage"
ON public.agrilink_ids
FOR SELECT
USING (used_by = auth.uid() OR NOT is_used);

-- Create proper RLS policies for payments
CREATE POLICY "Users can view payments for their orders"
ON public.payments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = payments.order_id 
    AND (orders.buyer_id = auth.uid() OR orders.agent_id = auth.uid())
  )
);

-- Create trigger to auto-create payment record when order is placed
CREATE OR REPLACE FUNCTION public.create_payment_on_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  farmer_momo_number TEXT;
  produce_farmer_share NUMERIC;
  produce_platform_share NUMERIC;
  transport_driver_share NUMERIC;
  transport_platform_share NUMERIC;
BEGIN
  -- Get farmer's momo number from product's agent profile
  SELECT p.momo_number INTO farmer_momo_number
  FROM profiles p
  INNER JOIN products prod ON prod.agent_id = p.user_id
  WHERE prod.id = NEW.product_id;
  
  -- Calculate splits (90% to farmer, 10% to platform)
  produce_farmer_share := NEW.total_price * 0.9;
  produce_platform_share := NEW.total_price * 0.1;
  
  -- Transport split (90% to driver, 10% to platform)
  transport_driver_share := NEW.transport_cost * 0.9;
  transport_platform_share := NEW.transport_cost * 0.1;
  
  -- Insert payment record
  INSERT INTO public.payments (
    order_id,
    farmer_amount,
    farmer_momo,
    transport_amount,
    platform_fee,
    status
  ) VALUES (
    NEW.id,
    produce_farmer_share + transport_driver_share,
    COALESCE(farmer_momo_number, 'pending'),
    transport_driver_share,
    produce_platform_share + transport_platform_share,
    'pending'
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS create_payment_on_order_trigger ON public.orders;
CREATE TRIGGER create_payment_on_order_trigger
AFTER INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.create_payment_on_order();