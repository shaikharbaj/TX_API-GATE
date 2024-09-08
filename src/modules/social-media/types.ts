export interface CreateSocialMediaBody {
    title: string;
    link: string;
    is_active?: boolean;
}

export interface ToggleSocialMediaVisibilityBody {
    is_active: boolean;
}

export interface UpdateSocialMediaBody {
    title: string;
    link: string;
    is_active?: boolean;
}

