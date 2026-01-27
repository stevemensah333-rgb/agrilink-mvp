-- Create a function to notify agent when an order is placed
CREATE OR REPLACE FUNCTION public.notify_on_order_placed()
RETURNS TRIGGER AS $$
DECLARE
  product_name TEXT;
BEGIN
  -- Get product name
  SELECT name INTO product_name FROM public.products WHERE id = NEW.product_id;
  
  -- Notify the agent about the new order
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (
    NEW.agent_id,
    'New Order Received',
    'You have a new order for ' || COALESCE(product_name, 'a product') || ' (Qty: ' || NEW.quantity || ')',
    'order'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create a function to notify buyer when order is confirmed
CREATE OR REPLACE FUNCTION public.notify_on_order_status_change()
RETURNS TRIGGER AS $$
DECLARE
  product_name TEXT;
BEGIN
  -- Only notify when status changes
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    -- Get product name
    SELECT name INTO product_name FROM public.products WHERE id = NEW.product_id;
    
    -- Notify buyer based on status
    IF NEW.status = 'confirmed' THEN
      INSERT INTO public.notifications (user_id, title, message, type)
      VALUES (
        NEW.buyer_id,
        'Order Confirmed',
        'Your order for ' || COALESCE(product_name, 'a product') || ' has been confirmed!',
        'order'
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new orders
DROP TRIGGER IF EXISTS on_order_placed ON public.orders;
CREATE TRIGGER on_order_placed
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_order_placed();

-- Create trigger for order status changes
DROP TRIGGER IF EXISTS on_order_status_change ON public.orders;
CREATE TRIGGER on_order_status_change
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_order_status_change();

-- Update notifications RLS to allow inserts from triggers (using service role)
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;
CREATE POLICY "Authenticated users can insert notifications"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);