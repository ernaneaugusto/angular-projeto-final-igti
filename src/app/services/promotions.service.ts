import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from './../config/urls';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private http: HttpClient) { }

  public getPromotions(): Observable<any> {
    return this.http.get<any>(`${URL.baseUrl}/${URL.promotions}`);
  }
  
  public getPromotionById(id: string): Observable<any> {
    return this.http.get<any>(`${URL.baseUrl}/${URL.promotions}?id=${id}`);
  }
 
  public getPromotionsByEstablishment(id: string): Observable<any> {
    return this.http.get<any>(`${URL.baseUrl}/${URL.promotions}?establishmentId=${id}`);
  }
  
  public deletePromotion(id: string): Observable<any> {
    return this.http.delete<any>(`${URL.baseUrl}/${URL.promotions}/${id}`);
  }
}
