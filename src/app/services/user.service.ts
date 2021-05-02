import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './../config/urls';
import { User } from './../shared/models/user/user.interface';
import { Observable } from 'rxjs';

export interface PromotionInfo {
  id: string;
  userId: string;
  promotionId: string;
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public setRegisterUser(data: User) {
    return this.http.post<User>(`${URL.baseUrl}/${URL.users}`, data);
  }
  
  public getPromotionByUser(userId: string | number): Observable<Array<PromotionInfo>> {
    return this.http.get<Array<PromotionInfo>>(`${URL.baseUrl}/${URL.promotionsByUser}?userId=${userId}`);
  }
  
  public setPromotionToUser(promotionInfo: PromotionInfo) {
    return this.http.post<PromotionInfo>(`${URL.baseUrl}/${URL.promotionsByUser}`, promotionInfo);
  }
  
  public updatePromotionToUser(promotionInfo: PromotionInfo) {
    const { id, isFavorite } = promotionInfo;
    
    return this.http.patch<PromotionInfo>(`${URL.baseUrl}/${URL.promotionsByUser}/${id}`, {isFavorite});
  }
  
  public deletePromotionToUser(id: string | number) {
    return this.http.delete<PromotionInfo>(`${URL.baseUrl}/${URL.promotionsByUser}/${id}`);
  }

  public updateUser(data: User) {
    const { id } = data;
    return this.http.patch<User>(`${URL.baseUrl}/${URL.users}/${id}`, data);
  }

  public getUserById(id: string) {
    return this.http.get<User>(`${URL.baseUrl}/${URL.users}/${id}`);
  }
  
  public getUserByEmailAndPassword(email: string, password: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${URL.baseUrl}/${URL.users}?email=${email}&password=${password}`);
  }
}
