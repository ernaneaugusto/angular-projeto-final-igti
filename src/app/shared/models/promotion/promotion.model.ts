
import { Promotion } from './promotion.interface';

export class PromotionModel {
  public id: string;
  public name: string;
  public description: string;
  public validity: string;
  public stars: number;
  public starsMin: number;
  public category: string;
  public expirate: string;
  public product: string;
  public weekDays: string;
  public establishmentId: string;
  public isFavorite?: boolean;

  constructor(data: Promotion) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.validity = data.validity;
    this.stars = data.stars;
    this.starsMin = data.starsMin;
    this.category = data.category;
    this.expirate = data.expirate;
    this.product = data.product;
    this.weekDays = data.weekDays;
    this.establishmentId = data.establishmentId;
    this.isFavorite = data.isFavorite;
  }
}
