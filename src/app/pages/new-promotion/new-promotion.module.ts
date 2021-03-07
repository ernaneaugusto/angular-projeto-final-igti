import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewPromotionComponent } from './new-promotion.component';
import { LayoutModule } from 'src/app/layout/layout.module';

const routes: Routes = [
  { path: '', component: NewPromotionComponent }
]

@NgModule({
  declarations: [
    NewPromotionComponent
  ],
  imports: [
  CommonModule,
  RouterModule.forChild(routes),
  LayoutModule
  ],
  exports: [
    NewPromotionComponent
  ]
})
export class NewPromotionModule { }
