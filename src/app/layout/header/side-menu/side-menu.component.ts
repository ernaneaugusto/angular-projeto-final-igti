import { Component, OnInit } from '@angular/core';
import { MENU } from 'src/app/config/menu/menu-items';
import { MenuItem } from 'src/app/shared/models/menu-item/menu-item.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  public menuItems: Array<MenuItem> = MENU;

  constructor() { }

  ngOnInit(): void {
  }

}
