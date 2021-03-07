import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionDetailsComponent } from './promotion-details.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PromotionDetailsComponent },
]

@NgModule({
  declarations: [PromotionDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [PromotionDetailsComponent]
})
export class PromotionDetailsModule { }
