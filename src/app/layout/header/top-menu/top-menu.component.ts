import { Component, OnInit } from '@angular/core';
import { MENU } from 'src/app/config/menu/menu-items';
import { MenuItem } from 'src/app/shared/models/menu-item/menu-item.interface';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public menuItems: Array<MenuItem> = MENU;

  constructor() { }

  ngOnInit(): void {
  }

}
