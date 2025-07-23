import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { contentService, SiteContent } from '@/services/contentService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';

const ContentManagement: React.FC = () => {
  const [allContent, setAllContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<SiteContent | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const { refreshContent } = useSiteContent();

  const loadContent = async () => {
    try {
      setLoading(true);
      const content = await contentService.fetchAllContentForAdmin();
      setAllContent(content);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load content",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleEdit = (content: SiteContent) => {
    setEditingContent(content);
    setIsEditDialogOpen(true);
  };

  const handleSave = async (updatedContent: Partial<SiteContent>) => {
    if (!editingContent) return;

    try {
      await contentService.updateContent(editingContent.id, updatedContent);
      await loadContent();
      await refreshContent();
      setIsEditDialogOpen(false);
      setEditingContent(null);
      
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update content",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      await contentService.deleteContent(id);
      await loadContent();
      await refreshContent();
      
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete content",
      });
    }
  };

  const groupedContent = allContent.reduce((acc, content) => {
    if (!acc[content.page]) {
      acc[content.page] = [];
    }
    acc[content.page].push(content);
    return acc;
  }, {} as Record<string, SiteContent[]>);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
            <p className="text-muted-foreground">
              Manage all site content from this central dashboard
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Content
          </Button>
        </div>

        {Object.entries(groupedContent).map(([page, pageContent]) => (
          <Card key={page}>
            <CardHeader>
              <CardTitle className="capitalize">{page} Page</CardTitle>
              <CardDescription>
                {pageContent.length} content section{pageContent.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section</TableHead>
                    <TableHead>Admin Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sort Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageContent.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell className="font-medium">{content.section_key}</TableCell>
                      <TableCell>{content.admin_title}</TableCell>
                      <TableCell>
                        <Badge variant={content.is_active ? "default" : "secondary"}>
                          {content.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{content.sort_order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(content)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(content.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}

        <EditContentDialog
          content={editingContent}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
};

interface EditContentDialogProps {
  content: SiteContent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<SiteContent>) => void;
}

const EditContentDialog: React.FC<EditContentDialogProps> = ({
  content,
  open,
  onOpenChange,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<SiteContent>>({});

  useEffect(() => {
    if (content) {
      setFormData({
        admin_title: content.admin_title,
        is_active: content.is_active,
        sort_order: content.sort_order,
        content_data: content.content_data,
      });
    }
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateContentData = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      content_data: {
        ...(prev.content_data as Record<string, any> || {}),
        [key]: value,
      },
    }));
  };

  if (!content) return null;

  const contentSchema = content.content_schema as Record<string, any>;
  const contentData = formData.content_data as Record<string, any> || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {content.admin_title}</DialogTitle>
          <DialogDescription>
            Update the content for {content.page} - {content.section_key}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="admin_title">Admin Title</Label>
              <Input
                id="admin_title"
                value={formData.admin_title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, admin_title: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order || 0}
                onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active || false}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">Content</h4>
            {Object.entries(contentSchema).map(([key, type]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Label>
                {type === 'text' && (
                  <Input
                    id={key}
                    value={contentData[key] || ''}
                    onChange={(e) => updateContentData(key, e.target.value)}
                  />
                )}
                {type === 'textarea' && (
                  <Textarea
                    id={key}
                    value={contentData[key] || ''}
                    onChange={(e) => updateContentData(key, e.target.value)}
                    rows={4}
                  />
                )}
                {type === 'image_url' && (
                  <Input
                    id={key}
                    type="url"
                    placeholder="https://..."
                    value={contentData[key] || ''}
                    onChange={(e) => updateContentData(key, e.target.value)}
                  />
                )}
                {typeof type === 'object' && (
                  <div className="p-4 border rounded-md bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-2">Complex object - JSON editing:</p>
                    <Textarea
                      value={JSON.stringify(contentData[key] || {}, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          updateContentData(key, parsed);
                        } catch {
                          // Invalid JSON, don't update
                        }
                      }}
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContentManagement;