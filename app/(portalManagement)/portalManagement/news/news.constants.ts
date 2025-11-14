import { FormConfig } from "@/components/custom/Form";
import { NewsFormValues } from "./news.types";

// Form configuration
export const NEWS_FORM_CONFIG: FormConfig<any> = {
  gridCols: 3,
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter the news title",
      validation: { required: "Title is required" },
      colSpan: 3,
    },
    {
      name: "content",
      label: "Content",
      type: "textarea",
      placeholder: "Write the full news content here...",
      colSpan: 3,
      validation: { required: "Content is required" },
    },
    {
      name: "summary",
      label: "Summary",
      type: "textarea",
      placeholder: "Enter a short summary (optional)",
      colSpan: 3,
    },
    {
      name: "image_url",
      label: "Image URL",
      type: "url",
      placeholder: "https://example.com/image.jpg",
      colSpan: 3,
      validation: {
        required: "Image URL is required",
        pattern: {
          value: /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})([\/\w .-]*)*\/?$/i,
          message:
            "Please enter a valid URL (must start with http:// or https://)",
        },
      },
    },

    {
      name: "category",
      label: "Category",
      type: "select",
      placeholder: "Select a category",
      options: [
        { label: "News", value: "News" },
        { label: "Updates", value: "Updates" },
        { label: "Events", value: "Events" },
        { label: "Announcements", value: "Announcements" },
        { label: "Press Release", value: "Press Release" },
        { label: "Product Updates", value: "Product Updates" },
        { label: "Travel Tips", value: "Travel Tips" },
        { label: "Other", value: "Other" }
      ],
      colSpan: 1,
    },
    {
      name: "tags",
      label: "Tags",
      type: "multiselect",
      placeholder: "Choose relevant tags",
      options: [
        { label: "Features", value: "Features" },
        { label: "Portal", value: "Portal" },
        { label: "Updates", value: "Updates" },
        { label: "Safety", value: "Safety" },
        { label: "Tips", value: "Tips" },
        { label: "Holidays", value: "Holidays" },
        { label: "Other", value: "Other" }
      ],
      colSpan: 2,
    },
    {
      name: "is_published",
      label: "Published",
      type: "checkbox",
      colSpan: 1,
    },
    {
      name: "is_featured",
      label: "Featured",
      type: "checkbox",
      colSpan: 1,
    },
  ],
};

// Default form values
export const NEWS_DEFAULT_VALUES: NewsFormValues = {  
  title: "",
  summary: "",
  content: "",
  category: "",
  image_url: "",
  tags: [],
  published_at: "",
  is_published: false,
  is_featured: false,
  display_order: 0,
  is_active: true,
  last_published_at: "",
  last_featured_at: "",
};

