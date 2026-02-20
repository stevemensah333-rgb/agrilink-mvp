
-- Tighten the agrilink_ids update policy to only allow marking as used
DROP POLICY "Users can mark agrilink_ids as used" ON public.agrilink_ids;
CREATE POLICY "Users can mark agrilink_ids as used"
ON public.agrilink_ids FOR UPDATE
TO authenticated
USING (is_used = false)
WITH CHECK (is_used = true AND used_by = auth.uid());
