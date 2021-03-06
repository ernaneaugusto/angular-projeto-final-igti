export interface Promotion {
  id: string;
  name: string;
  validity: string;
  stars: number;
  starsMin: number;
  category: string;
  expirate: string;
  product: string;
  weekDays: string;
  description: string;
  establishmentId: string;
  isFavorite?: boolean;
}
