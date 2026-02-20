
-- 1. Allow admins to see ALL orders
CREATE POLICY "Admins can view all orders"
ON public.orders FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  )
);

-- 2. Allow admins to update ALL orders
CREATE POLICY "Admins can update all orders"
ON public.orders FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  )
);

-- 3. Allow admins to see ALL products
CREATE POLICY "Admins can view all products"
ON public.products FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  )
);

-- 4. Allow admins to see ALL payments
CREATE POLICY "Admins can view all payments"
ON public.payments FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  )
);

-- 5. Allow farmers to insert products
CREATE POLICY "Farmers can insert their own products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = agent_id AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role IN ('farmer', 'agent')
  )
);

-- 6. Allow agrilink_ids to be updated
CREATE POLICY "Users can mark agrilink_ids as used"
ON public.agrilink_ids FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 7. Enable realtime for products (orders and notifications already enabled)
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;

-- 8. Trigger to notify admins on new product
CREATE OR REPLACE FUNCTION public.notify_admins_on_product_added()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  admin_record RECORD;
BEGIN
  FOR admin_record IN 
    SELECT user_id FROM public.profiles WHERE role = 'admin'
  LOOP
    INSERT INTO public.notifications (user_id, title, message, type)
    VALUES (
      admin_record.user_id,
      'New Product Listed',
      'A new product "' || NEW.name || '" has been added to the marketplace.',
      'product'
    );
  END LOOP;
  RETURN NEW;
END;
$function$;

CREATE TRIGGER trigger_notify_admins_on_product
  AFTER INSERT ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admins_on_product_added();

-- 9. Update order status notification with payment prompt
CREATE OR REPLACE FUNCTION public.notify_on_order_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  product_name TEXT;
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    SELECT name INTO product_name FROM public.products WHERE id = NEW.product_id;
    
    IF NEW.status = 'confirmed' THEN
      INSERT INTO public.notifications (user_id, title, message, type)
      VALUES (
        NEW.buyer_id,
        'Order Approved - Payment Required',
        'Your order for ' || COALESCE(product_name, 'a product') || ' has been approved! Please send payment of ₵' || 
        (NEW.total_price + NEW.transport_cost + NEW.service_fee)::text || 
        ' to 0533346350 (MTN Mobile Money). Your order will be delivered in 30-45 mins after payment confirmation.',
        'payment'
      );
    ELSIF NEW.status = 'delivered' THEN
      INSERT INTO public.notifications (user_id, title, message, type)
      VALUES (
        NEW.buyer_id,
        'Order Delivered',
        'Your order for ' || COALESCE(product_name, 'a product') || ' has been delivered!',
        'order'
      );
    ELSIF NEW.status = 'cancelled' THEN
      INSERT INTO public.notifications (user_id, title, message, type)
      VALUES (
        NEW.buyer_id,
        'Order Cancelled',
        'Your order for ' || COALESCE(product_name, 'a product') || ' has been cancelled. Reason: ' || COALESCE(NEW.cancelled_reason, 'Not specified'),
        'order'
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;
