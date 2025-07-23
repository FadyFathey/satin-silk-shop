import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type SiteContent = Database['public']['Tables']['site_content']['Row'];
export type SiteContentInsert = Database['public']['Tables']['site_content']['Insert'];
export type SiteContentUpdate = Database['public']['Tables']['site_content']['Update'];

export interface ProcessedContent {
  [page: string]: {
    [sectionKey: string]: Record<string, any>;
  };
}

class ContentService {
  /**
   * Fetch all active content from the site_content table
   */
  async fetchAllContent(): Promise<SiteContent[]> {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) {
      console.error('Error fetching site content:', error);
      throw error;
    }

    return data || [];
  }

  /**
   * Fetch content for a specific page
   */
  async fetchPageContent(page: string): Promise<SiteContent[]> {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', page)
      .eq('is_active', true)
      .order('sort_order');

    if (error) {
      console.error(`Error fetching content for page ${page}:`, error);
      throw error;
    }

    return data || [];
  }

  /**
   * Fetch content for admin (includes inactive content)
   */
  async fetchAllContentForAdmin(): Promise<SiteContent[]> {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('page', { ascending: true })
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching all content for admin:', error);
      throw error;
    }

    return data || [];
  }

  /**
   * Create new content entry
   */
  async createContent(content: Omit<SiteContent, 'id' | 'created_at' | 'updated_at'>): Promise<SiteContent> {
    const { data, error } = await supabase
      .from('site_content')
      .insert(content)
      .select()
      .single();

    if (error) {
      console.error('Error creating content:', error);
      throw error;
    }

    return data;
  }

  /**
   * Update existing content entry
   */
  async updateContent(id: string, updates: Partial<SiteContent>): Promise<SiteContent> {
    const { data, error } = await supabase
      .from('site_content')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating content:', error);
      throw error;
    }

    return data;
  }

  /**
   * Delete content entry
   */
  async deleteContent(id: string): Promise<void> {
    const { error } = await supabase
      .from('site_content')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
  }

  /**
   * Process flat content array into nested object for easy consumption
   * Transforms: [{page: 'home', section_key: 'hero', content_data: {...}}]
   * Into: {home: {hero: {...}}}
   */
  processContentData(contentArray: SiteContent[]): ProcessedContent {
    const processed: ProcessedContent = {};

    contentArray.forEach((item) => {
      if (!processed[item.page]) {
        processed[item.page] = {};
      }
      processed[item.page][item.section_key] = item.content_data as Record<string, any>;
    });

    return processed;
  }
}

export const contentService = new ContentService();