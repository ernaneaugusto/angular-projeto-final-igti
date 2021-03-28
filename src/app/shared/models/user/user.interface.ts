import { Promotion } from './../promotion/promotion.interface';

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
  promotions?: Array<Promotion>;
}
