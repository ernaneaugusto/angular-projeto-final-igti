import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardPromoComponent } from './components/card-promo/card-promo.component';
import { StatusMessageComponent } from './components/status-message/status-message.component';

@NgModule({
  declarations: [
    CardPromoComponent,
    StatusMessageComponent
  ],
  imports: [
  CommonModule,
  RouterModule
  ],
  exports: [
    CardPromoComponent,
    StatusMessageComponent
  ]
})
export class SharedModule { }
