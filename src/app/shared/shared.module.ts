import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardPromoComponent } from './components/card-promo/card-promo.component';

@NgModule({
  declarations: [
    CardPromoComponent
  ],
  imports: [
  CommonModule,
  RouterModule
  ],
  exports: [
    CardPromoComponent
  ]
})
export class SharedModule { }
