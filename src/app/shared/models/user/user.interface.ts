import { Promotion } from './../promotion/promotion.interface';

export interface User {
  id: string;
  promotions?: Array<Promotion>;
  name: string;
  email: string;
  type: string;
  birthday?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
}

export interface UserLocalData {
  id: string;
  type: string;
  establishmentId?: string;
}
