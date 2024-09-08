export interface CreateWarehouseBody {
  name: string;
  address_line_1?: string;
  address_line_2?: string;
  city_id: string;
  state_id: string;
  country_id: string;
  zip_code: string;
  is_active?: boolean;
}

export interface ToggleWarehouseVisibilityBody {
  is_active: boolean;
}

export interface UpdateWarehouseBody {
  name?: string;

  address_line_1?: string;
  address_line_2?: string;
  city_id: string;
  state_id: string;
  country_id: string;
  zip_code?: string;
  is_active?: boolean;
}
