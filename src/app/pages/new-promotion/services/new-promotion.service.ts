import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './../../../config/urls';
import { Promotion } from './../../../shared/models/promotion/promotion.interface';
import { PromotionModel } from 'src/app/shared/models/promotion/promotion.model';

@Injectable({
  providedIn: 'root',
})
export class NewPromotionService {
  constructor(private http: HttpClient) {}

  public setNewPromotion(data: Promotion) {
    return this.http.post<Promotion>(`${URL.baseUrl}/${URL.promotions}`, data);
  }
  
  public editPromotion(data: Promotion) {
    return this.http.put<Promotion>(`${URL.baseUrl}/${URL.promotions}/${data.id}`, data);
  }

  public getPromotionById(id: string) {
    return this.http.get<Promotion>(`${URL.baseUrl}/${URL.promotions}/${id}`);
  }

  public createPromotionModel(promotion: Array<Promotion>) {
    const promotionModel = new Array<PromotionModel>();

    promotion.map((promo: Promotion) => {
      promotionModel.push(new PromotionModel(promo));
    });

    return promotionModel;
  }
}
