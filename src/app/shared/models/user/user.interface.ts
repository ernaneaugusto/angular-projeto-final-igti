import { Promotion } from './../promotion/promotion.interface';

export interface User {
  id?: string;
  birthday?: string;
  password?: string;
  confirmPassword?: string;
  promotions?: Array<Promotion>;
  name: string;
  email: string;
  type: string;
}
