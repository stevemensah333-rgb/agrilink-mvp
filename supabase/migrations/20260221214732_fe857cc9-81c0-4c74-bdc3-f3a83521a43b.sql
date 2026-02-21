
-- 1. Fix RLS: Let ALL agents see ALL orders (not just their own)
CREATE POLICY "Agents can view all orders globally"
ON public.orders FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'agent'::user_role
  )
);

-- Let agents update any order (for confirming/cancelling)
CREATE POLICY "Agents can update all orders globally"
ON public.orders FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'agent'::user_role
  )
);

-- 2. Create storage bucket for produce images
INSERT INTO storage.buckets (id, name, public)
VALUES ('produce-images', 'produce-images', true);

-- Storage policies
CREATE POLICY "Anyone can view produce images"
ON storage.objects FOR SELECT
USING (bucket_id = 'produce-images');

CREATE POLICY "Authenticated users can upload produce images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'produce-images');

CREATE POLICY "Users can update their own produce images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'produce-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own produce images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'produce-images' AND auth.uid()::text = (storage.foldername(name))[1]);
