export interface CreateAttributeBody {
  category_id: string;
  attribute_name: string;
  is_active?: boolean;
}

export interface ToggleAttributeVisibilityBody {
  is_active: boolean;
}

export interface UpdateAttributeBody {
  category_id: string;
  attribute_name: string;
  is_active?: boolean;
}
