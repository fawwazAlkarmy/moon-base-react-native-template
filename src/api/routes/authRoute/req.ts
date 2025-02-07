export type LoginPayload = {
  phone: string;
};

export type RegisterPayload = {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  dob: string;
  gender: number;
  userLevel: number;
};

export type VerifyOTPPayload = {
  id: string;
  otp: string;
};
