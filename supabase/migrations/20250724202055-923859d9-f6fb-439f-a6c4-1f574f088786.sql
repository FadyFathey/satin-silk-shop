-- Security Fixes Migration
-- Fix 1: Enable RLS on website_analytics table (Critical)
ALTER TABLE public.website_analytics ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for website_analytics
CREATE POLICY "Admin can manage analytics" 
ON public.website_analytics 
FOR ALL 
USING (is_admin());

CREATE POLICY "Allow public insert for page tracking" 
ON public.website_analytics 
FOR INSERT 
WITH CHECK (true);

-- Fix 2: Secure all database functions by setting search_path (10 functions)
-- Update each function to set search_path = public, preventing search path attacks

-- 1. is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  RETURN (
    SELECT email FROM public.profiles 
    WHERE id = auth.uid() AND email = 'fadyfathymaher3@gmail.com'
  ) IS NOT NULL;
END;
$function$;

-- 2. get_user_role function  
CREATE OR REPLACE FUNCTION public.get_user_role()
 RETURNS user_role
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  RETURN (
    SELECT role FROM public.profiles WHERE id = auth.uid()
  );
END;
$function$;

-- 3. generate_order_number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
  order_num TEXT;
BEGIN
  SELECT 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD((EXTRACT(EPOCH FROM NOW())::INTEGER % 100000)::TEXT, 5, '0')
  INTO order_num;
  RETURN order_num;
END;
$function$;

-- 4. update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- 5. handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    CASE 
      WHEN NEW.email = 'fadyfathymaher3@gmail.com' THEN 'admin'::user_role
      ELSE 'customer'::user_role
    END
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't block user creation
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$function$;

-- 6. get_total_page_views function
CREATE OR REPLACE FUNCTION public.get_total_page_views()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  RETURN (SELECT COUNT(*) FROM public.website_analytics);
END;
$function$;

-- 7. get_total_visitors function
CREATE OR REPLACE FUNCTION public.get_total_visitors()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT visitor_ip)
    FROM public.website_analytics
    WHERE visitor_ip IS NOT NULL AND visitor_ip != ''
  );
END;
$function$;

-- 8. increment_blog_view function
CREATE OR REPLACE FUNCTION public.increment_blog_view(blog_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  UPDATE public.blogs 
  SET views = views + 1 
  WHERE id = blog_id;
END;
$function$;

-- 9. increment_project_view function
CREATE OR REPLACE FUNCTION public.increment_project_view(project_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  UPDATE public.projects 
  SET views = views + 1 
  WHERE id = project_id;
END;
$function$;

-- 10. record_page_visit function
CREATE OR REPLACE FUNCTION public.record_page_visit(page_path text, visitor_ip text DEFAULT NULL::text, user_agent text DEFAULT NULL::text, referrer text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  client_ip text;
BEGIN
  -- Get the actual client IP address from the connection
  -- Use the provided visitor_ip if available, otherwise try to get it from the connection
  client_ip := COALESCE(visitor_ip, inet_client_addr()::text);

  -- Insert the page visit record
  INSERT INTO public.website_analytics (page_path, visitor_ip, user_agent, referrer)
  VALUES (page_path, client_ip, user_agent, referrer);
END;
$function$;