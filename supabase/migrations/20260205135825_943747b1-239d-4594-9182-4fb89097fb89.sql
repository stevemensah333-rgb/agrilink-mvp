-- Add momo_number and agrilink_id to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS momo_number text,
ADD COLUMN IF NOT EXISTS agrilink_id text UNIQUE;

-- Create a table to store valid AgriLink IDs for agents and admins
CREATE TABLE public.agrilink_ids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agrilink_id text UNIQUE NOT NULL,
  id_type text NOT NULL CHECK (id_type IN ('agent', 'admin')),
  is_used boolean DEFAULT false,
  used_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.agrilink_ids ENABLE ROW LEVEL SECURITY;

-- Anyone can check if an ID exists (for validation)
CREATE POLICY "Anyone can check agrilink IDs"
ON public.agrilink_ids
FOR SELECT
USING (true);

-- Only admins can manage IDs (we'll handle this via edge function)
CREATE POLICY "Service role can manage IDs"
ON public.agrilink_ids
FOR ALL
USING (true);

-- Insert some sample AgriLink IDs for testing
INSERT INTO public.agrilink_ids (agrilink_id, id_type) VALUES
('AGT-001', 'agent'),
('AGT-002', 'agent'),
('AGT-003', 'agent'),
('ADM-001', 'admin'),
('ADM-002', 'admin');

-- Create payments table to track payment splits
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  farmer_amount numeric NOT NULL,
  farmer_momo text NOT NULL,
  transport_amount numeric DEFAULT 0,
  driver_momo text,
  platform_fee numeric NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at timestamp with time zone DEFAULT now(),
  processed_at timestamp with time zone
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Admins can view all payments (via service role)
CREATE POLICY "Service role manages payments"
ON public.payments
FOR ALL
USING (true);