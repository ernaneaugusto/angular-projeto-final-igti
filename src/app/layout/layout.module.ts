import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './header/top-menu/top-menu.component';
import { SideMenuComponent } from './header/side-menu/side-menu.component';
import { MainContentComponent } from './main-content/main-content.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TopMenuComponent,
    SideMenuComponent,
    MainContentComponent,
],
imports: [
    CommonModule
],
exports: [
    HeaderComponent,
    FooterComponent,
    TopMenuComponent,
    SideMenuComponent,
    MainContentComponent,
  ]
})
export class LayoutModule { }
