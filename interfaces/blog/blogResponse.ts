export interface IBlogListResponse {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    thumbnail_url: string;
    title: string;
    content: string;
    description: string;
    is_featured?: any;
  }
  
  