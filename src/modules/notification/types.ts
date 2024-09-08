export interface sendOTPBody {
  mobile_number: string;
}

export interface verifyOTPBody {
  mobile_number: string;
  otp: string;
}
