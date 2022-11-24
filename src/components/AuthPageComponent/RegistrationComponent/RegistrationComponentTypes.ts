export interface FormUser {
  firstName: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

export interface FormErrors {
  firstName: boolean;
  surname: boolean;
  username: boolean;
  email: boolean;
  password: boolean;
  repeatedPassword: boolean;
}
