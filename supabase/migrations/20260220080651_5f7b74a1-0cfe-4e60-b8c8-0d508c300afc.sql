
-- Fix: Update handle_new_user trigger to also mark agrilink_ids as used
-- This is needed because auth.uid() is null during signup (before email confirmation)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, role, location, momo_number, phone, agrilink_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'buyer'),
    NEW.raw_user_meta_data->>'location',
    NEW.raw_user_meta_data->>'momo_number',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'agrilink_id'
  );

  -- Mark agrilink_id as used (done here because auth.uid() is null before email confirmation)
  IF NEW.raw_user_meta_data->>'agrilink_id' IS NOT NULL THEN
    UPDATE public.agrilink_ids
    SET is_used = true, used_by = NEW.id
    WHERE agrilink_id = UPPER(NEW.raw_user_meta_data->>'agrilink_id')
      AND is_used = false;
  END IF;

  RETURN NEW;
END;
$$;
