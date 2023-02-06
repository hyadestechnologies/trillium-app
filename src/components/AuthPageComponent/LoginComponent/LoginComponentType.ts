import type { User } from '@/shared/types/user';

export interface Response {
  access_token: string;
  user: User;
}

export interface FormErrors {
  username: boolean;
  password: boolean;
}
