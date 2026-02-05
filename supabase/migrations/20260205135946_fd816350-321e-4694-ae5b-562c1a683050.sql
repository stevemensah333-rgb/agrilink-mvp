-- Update handle_new_user function to store additional profile fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
  RETURN NEW;
END;
$$;