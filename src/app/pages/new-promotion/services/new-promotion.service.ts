import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './../../../config/urls';
import { Promotion } from './../../../shared/models/promotion/promotion.interface';

@Injectable({
  providedIn: 'root'
})
export class NewPromotionService {

  constructor(private http: HttpClient) { }

  public setNewPromotion(data: Promotion) {
    return this.http.post<Promotion>(`${URL.baseUrl}/${URL.promotions}`, data);
  }
}
