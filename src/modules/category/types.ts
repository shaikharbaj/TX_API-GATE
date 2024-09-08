export interface CreateCategoryBody {
    division_id: number;
    category_name: string;
    category_type: string;
    category_description: string;
    is_active?: boolean;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
}

export interface ToggleCategoryVisibilityBody {
    is_active: boolean;
}

export interface UpdateCategoryBody {
    division_id: number;
    category_name: string;
    category_type: string;
    category_description: string;
    is_active?: boolean;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
}

