export type AuthResult = {
  token: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type SignUpBody = {
  email: string;
  password: string;
};

export type SignInBody = {
  email: string;
  password: string;
};
