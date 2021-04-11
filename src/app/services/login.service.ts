import { Injectable } from '@angular/core';
import { User, UserLocalData } from './../shared/models/user/user.interface';
import { UserService } from './user.service';
import { Router } from '@angular/router';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public userData: UserLocalData = {
    id: '',
    type: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  public login(email: string, password: string): void {
    this.userService
        .getUserByEmailAndPassword(email, password)
        .subscribe((users: Array<User>) => {
          // Verifica se existe o usuario e senha informados
          const user = users.filter(
            (user) => user.email === email && user.password === password
          );

          if (user.length > 0) {
            const { id, type } = user[0];
            this.setUserLocalStorage({ id, type });
            
            // @TODO: corrigir rotas admin e cliente
            // const url = type === "E" ? "/admin" : "";
            const url = "/admin";
            
            this.router.navigateByUrl(url);
          } else {
            alert("Usuário ou senha incorretos!");
          }
        });
  }
  
  public logout(): void {
    const confirmLogout = confirm("Tem certeza que deseja sair?");

    if(confirmLogout) {
      localStorage.clear();
      this.router.navigateByUrl("/login");
    }
  }

  public setUserLocalStorage(user: UserLocalData): void {
    this.userData = user;
    localStorage.setItem(USER_KEY, JSON.stringify(this.userData));
  }

  public getUserLocalStorage(key = USER_KEY): string {
    const localUser = localStorage.getItem(key);
    return localUser ? localUser : '';
  }
}
