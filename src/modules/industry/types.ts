export interface CreateIndustryBody {
    industry_name: string;
    is_active?: boolean;
}

export interface ToggleIndustryVisibilityBody {
    is_active: boolean;
}

export interface UpdateIndustryBody {
    industry_name: string;
    is_active?: boolean;

}

