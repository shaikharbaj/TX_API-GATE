export interface CreateProductRatingBody {
    uom_code: string;
    rounding_rule: string;
    rounding_value: string;
    decimal_scale?: number;
    description?: string;
    is_active?: boolean;
}

export interface ToggleProductRatingVisibilityBody {
    is_active: boolean;
}


