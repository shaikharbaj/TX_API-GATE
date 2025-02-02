export interface CreateStateBody {
  country_id: number;
  state_name: string;
  short_code: string;
  is_active?: boolean | string;
}

export interface UpdateStateBody {
  country_id: number;
  state_name: string;
  short_code: string;
  is_active?: string | boolean;
}

export interface toggleStateVisibilityBody {
  is_active: boolean | string;
}
