import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './header/top-menu/top-menu.component';
import { SideMenuComponent } from './header/side-menu/side-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TopMenuComponent,
    SideMenuComponent,
],
imports: [
    CommonModule
],
exports: [
    HeaderComponent,
    FooterComponent,
    TopMenuComponent,
    SideMenuComponent
  ]
})
export class LayoutModule { }
