// Type definitions for News Management
export type NewsFormValues = {
  id?:string,
  title: string;
  summary?: string;
  content: string;
  category?: string;
  image_url?: string;
  tags?: string[];
  published_at?: string;
  is_published: boolean;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  last_published_at?:string 
  last_featured_at?:string ;
};

export type NewsViewType = "list" | "form";