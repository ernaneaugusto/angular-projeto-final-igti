import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLogged = false;
  public userId: string | number = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.router
      .events
      .subscribe((event: Event) => {
        if(event instanceof NavigationStart && event.url !== '/' && event.url !== '/login') {
          this.isLogged = true;
        }
      });
  }

  ngOnInit(): void {
    this.userId = this.loginService.getUserLocalStorage().id;
  }

  public logout(): void {
    this.loginService.logout();
  }

}
