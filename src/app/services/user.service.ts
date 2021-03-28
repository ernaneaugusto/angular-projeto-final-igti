import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './../config/urls';
import { User } from './../shared/models/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public setRegisterUser(data: User) {
    return this.http.post<User>(`${URL.baseUrl}/${URL.users}`, data);
  }
}
