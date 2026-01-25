-- Create products table for farm produce
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'kg',
  location TEXT,
  category TEXT NOT NULL DEFAULT 'Vegetables',
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  transport_mode TEXT NOT NULL,
  transport_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  service_fee DECIMAL(10,2) NOT NULL DEFAULT 10,
  status TEXT NOT NULL DEFAULT 'pending',
  delivery_location TEXT,
  notes TEXT,
  cancelled_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Products RLS policies
CREATE POLICY "Anyone can view available products"
ON public.products FOR SELECT
USING (is_available = true);

CREATE POLICY "Agents can view all their products"
ON public.products FOR SELECT
TO authenticated
USING (auth.uid() = agent_id);

CREATE POLICY "Agents can insert their own products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Agents can update their own products"
ON public.products FOR UPDATE
TO authenticated
USING (auth.uid() = agent_id);

CREATE POLICY "Agents can delete their own products"
ON public.products FOR DELETE
TO authenticated
USING (auth.uid() = agent_id);

-- Orders RLS policies
CREATE POLICY "Buyers can view their own orders"
ON public.orders FOR SELECT
TO authenticated
USING (auth.uid() = buyer_id);

CREATE POLICY "Agents can view orders for their products"
ON public.orders FOR SELECT
TO authenticated
USING (auth.uid() = agent_id);

CREATE POLICY "Buyers can create orders"
ON public.orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Agents can update orders for their products"
ON public.orders FOR UPDATE
TO authenticated
USING (auth.uid() = agent_id);

CREATE POLICY "Buyers can update their own orders"
ON public.orders FOR UPDATE
TO authenticated
USING (auth.uid() = buyer_id);

-- Trigger for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for orders
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;