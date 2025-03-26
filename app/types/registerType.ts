export interface UserCredential {
  user_name: string | null;
  user_email: string | null;
  user_password: string | number | null;
  repassword?: string;
}
export interface RegisterStore {
  data: UserCredential;
  setData: (value: UserCredential) => void;
}
