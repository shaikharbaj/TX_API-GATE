export interface CreateAttributeValueBody {
  attribute_id: string;
  attribute_value_name: string;
  is_active?: boolean;
}

export interface ToggleAttributeValueVisibilityBody {
  is_active: boolean;
}

export interface UpdateAttributeValueBody {
  attribute_id: string;
  attribute_value_name: string;
  is_active?: boolean;
}
