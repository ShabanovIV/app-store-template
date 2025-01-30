export type AuthResult = {
  token: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
  commandId: string;
};

export type SignUpBody = {
  email: string;
  password: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type UpdateProfileBody = {
  name: string;
};

export type ChangePasswordBody = {
  password: string;
  newPassword: string;
};
