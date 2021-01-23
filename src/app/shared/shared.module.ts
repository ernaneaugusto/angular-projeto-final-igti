import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPromoComponent } from './components/card-promo/card-promo.component';

@NgModule({
  declarations: [
    CardPromoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardPromoComponent
  ]
})
export class SharedModule { }
