-- Phase 1: Create the Content Engine - site_content table
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  section_key TEXT NOT NULL,
  admin_title TEXT NOT NULL,
  content_schema JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure unique combination of page and section_key
  UNIQUE(page, section_key)
);

-- Enable Row Level Security
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow public read access for active content
CREATE POLICY "Public can view active content" 
ON public.site_content 
FOR SELECT 
USING (is_active = true);

-- RLS Policy: Admin can manage all content (uses existing is_admin() function)
CREATE POLICY "Admin can manage all content" 
ON public.site_content 
FOR ALL 
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial homepage content to demonstrate the structure
INSERT INTO public.site_content (page, section_key, admin_title, content_schema, content_data) VALUES
('home', 'hero_banner', 'Homepage Hero Banner', 
'{"title": "text", "subtitle": "textarea", "backgroundImage": "image_url", "ctaButton": {"text": "text", "link": "url"}}'::jsonb,
'{"title": "Elegant Lingerie Collection", "subtitle": "Discover our exquisite range of premium intimate wear designed for comfort, style, and confidence.", "backgroundImage": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", "ctaButton": {"text": "Shop Now", "link": "/shop"}}'::jsonb),

('home', 'features_section', 'Homepage Features', 
'{"title": "text", "features": [{"icon": "text", "title": "text", "description": "text"}]}'::jsonb,
'{"title": "Why Choose Us", "features": [{"icon": "Truck", "title": "Free Shipping", "description": "Free shipping on orders over $100"}, {"icon": "Shield", "title": "Secure Payment", "description": "Your payment information is safe with us"}, {"icon": "RotateCcw", "title": "Easy Returns", "description": "30-day return policy for your peace of mind"}]}'::jsonb),

('home', 'brand_story', 'Brand Story Section', 
'{"title": "text", "content": "textarea", "image": "image_url", "ctaButton": {"text": "text", "link": "url"}}'::jsonb,
'{"title": "Our Story", "content": "Founded with a passion for creating beautiful, comfortable intimate wear, we believe every woman deserves to feel confident and elegant. Our carefully curated collection combines timeless design with modern comfort, using only the finest materials and craftsmanship.", "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", "ctaButton": {"text": "Learn More", "link": "/about"}}'::jsonb),

('home', 'newsletter_signup', 'Newsletter Signup', 
'{"title": "text", "subtitle": "text", "placeholder": "text", "buttonText": "text"}'::jsonb,
'{"title": "Stay Updated", "subtitle": "Subscribe to our newsletter and be the first to know about new arrivals and exclusive offers.", "placeholder": "Enter your email address", "buttonText": "Subscribe"}'::jsonb);