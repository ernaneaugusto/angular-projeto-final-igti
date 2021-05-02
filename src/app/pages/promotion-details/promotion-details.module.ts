import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionDetailsComponent } from './promotion-details.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: PromotionDetailsComponent },
]

@NgModule({
  declarations: [PromotionDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [PromotionDetailsComponent]
})
export class PromotionDetailsModule { }
