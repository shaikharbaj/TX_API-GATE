export interface CreateUomBody {
    uom_code: string;
    rounding_rule: string;
    rounding_value: string;
    decimal_scale?: number;
    description?: string;
    is_active?: boolean;
}

export interface ToggleUomVisibilityBody {
    is_active: boolean;
}

export interface UpdateUomBody {
    uom_code: string;
    rounding_rule: string;
    rounding_value: string;
    decimal_scale?: number;
    description?: string;
    is_active?: boolean;
}

