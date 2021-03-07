export interface Promotion {
  id: string;
  name: string;
  description: string;
}

export class PromotionModel {
  public id: string;
  public name: string;
  public description: string;

  constructor(data: Promotion) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }
}
