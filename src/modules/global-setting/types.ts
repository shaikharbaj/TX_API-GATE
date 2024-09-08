export interface UpdateGlobalSettingBody {
    site_name: string;
    site_email: string;
    phone: string;
    address: string;
    otp_explore_time: number;
    revenue_percentage: number;
    currency_symbol: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    footer_content: string;
    time_zone: string;
    is_active?: boolean;
}

