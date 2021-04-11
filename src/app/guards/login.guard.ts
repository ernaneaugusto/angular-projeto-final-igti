import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  constructor(private loginService: LoginService) {}

  canLoad(
    route: Route
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.loginService.getUserLocalStorage('user');
    let isLogin = (user.id !== "" && user.type !== "") ? true : false;

    if (!isLogin) {
      this.loginService.clearLocalStorage();
    }
    return isLogin;
  }
}
