import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from './../config/urls';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(private http: HttpClient) {}

  public getEstablishments(): Observable<any> {
    return this.http.get(`${URL.baseUrl}/${URL.establishments}`);
  }
  
  public getPromotionByEstablishment(id: string | number): Observable<any> {
    // @TODO: Tipar retorno
    return this.http.get(`${URL.baseUrl}/${URL.establishments}?establishmentId=${id}`);
  }
}
