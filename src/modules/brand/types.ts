export interface CreateBrandBody {
  brand_name: string;
  category_uuid: string;
  brand_description: string;
  is_active?: boolean;
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
}

export interface ToggleBrandVisibilityBody {
  is_active: boolean;
}

export interface UpdateBrandBody {
  brand_name: string;
  category_uuid: string;
  brand_description: string;
  is_active?: boolean;
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
}
