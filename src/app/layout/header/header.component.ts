import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { ActivatedRoute, Router, RouterEvent, Event, NavigationStart } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLogged = false;

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

  ngOnInit(): void { }

  public logout(): void {
    this.loginService.logout();
  }

}
