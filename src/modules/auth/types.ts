export interface AdminLoginBody {
  email: string;
  password: string;
}

export interface RegisterSellerBody {
  first_name: string;
  last_name: string,
  email: string,
  mobile_number: string,
  password: string,
}

export interface RegisterBuyerBody {
  id: number;
  uuid: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_number?: string;
  pan_card_number?: string;
  aadhar_card_number?: string;
  user_type: string;
  password: string;
  confirmPassword: string;
}

export interface SellerLoginBody {
  email: string;
  password: string;
}

export interface BuyerLoginBody {
  email: string;
  password: string;
}

export interface ForgotPasswordBody {
  email: string;
}

export interface ResetPasswordBody {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}