import { Injectable } from '@angular/core';
import { UserLocalData } from './../shared/models/user/user.interface';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { EstablishmentService } from './establishment.service';
import { forkJoin } from 'rxjs';

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
    private establishmentService: EstablishmentService,
    private router: Router
  ) {}

  public login(email: string, password: string): void {
    forkJoin([
      this.userService.getUserByEmailAndPassword(email, password),
      this.establishmentService.getEstablishments(),
    ]).subscribe(([userResponse, estabResponse]) => {
      const userData: UserLocalData = {
        id: '',
        type: '',
      };

      // Verifica se existe o usuario e senha informados
      const user = userResponse.filter(
        (user) => user.email === email && user.password === password
      );

      if (user.length > 0) {
        const { id, type } = user[0];

        userData.id = id;
        userData.type = type;

        if (type === 'E') {
          userData.establishmentId = `${estabResponse[0].establishmentId}`;
        }

        this.setUserLocalStorage(userData);

        // @TODO: corrigir rotas admin e cliente
        // const url = type === "E" ? "/admin" : "";
        const url = '/admin';

        this.router.navigateByUrl(url);
      } else {
        alert('Usuário ou senha incorretos!');
      }
    });
  }

  public logout(): void {
    const confirmLogout = confirm('Tem certeza que deseja sair?');

    if (confirmLogout) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }

  public clearLocalStorage(): void {
    alert('Você precisa estar logado para acessar essa página!');
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public setUserLocalStorage(user: UserLocalData): void {
    this.userData = user;
    localStorage.setItem(USER_KEY, JSON.stringify(this.userData));
  }

  public getUserLocalStorage(key = USER_KEY): UserLocalData {
    const localUser = localStorage.getItem(key);
    const userParse = this.formatUserLocalStorage(localUser || '');
    return userParse;
  }

  private formatUserLocalStorage(data: string): UserLocalData {
    const localData: UserLocalData = {
      id: '',
      type: '',
      establishmentId: '',
    };

    if (data.length !== 0) {
      const parseData = JSON.parse(data);
      localData.id = parseData.id;
      localData.type = parseData.type;
      localData.establishmentId = parseData.establishmentId ? parseData.establishmentId : '';
    }
    return localData;
  }
}
