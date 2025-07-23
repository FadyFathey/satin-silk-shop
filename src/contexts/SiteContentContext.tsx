import React, { createContext, useContext, useEffect, useState } from 'react';
import { contentService, ProcessedContent, SiteContent } from '@/services/contentService';
import { useToast } from '@/hooks/use-toast';

interface SiteContentContextType {
  content: ProcessedContent;
  isLoading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export const useSiteContent = (): SiteContentContextType => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};

interface SiteContentProviderProps {
  children: React.ReactNode;
}

export const SiteContentProvider: React.FC<SiteContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState<ProcessedContent>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const contentArray = await contentService.fetchAllContent();
      const processedContent = contentService.processContentData(contentArray);
      
      setContent(processedContent);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load site content';
      setError(errorMessage);
      console.error('Error loading site content:', err);
      
      toast({
        variant: "destructive",
        title: "Content Loading Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshContent = async () => {
    await loadContent();
  };

  useEffect(() => {
    loadContent();
  }, []);

  const value: SiteContentContextType = {
    content,
    isLoading,
    error,
    refreshContent,
  };

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
};