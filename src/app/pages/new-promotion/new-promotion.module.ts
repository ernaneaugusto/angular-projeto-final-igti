import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewPromotionComponent } from './new-promotion.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: NewPromotionComponent },
  { path: ':id', component: NewPromotionComponent }
]

@NgModule({
  declarations: [
    NewPromotionComponent
  ],
  imports: [
  CommonModule,
  RouterModule.forChild(routes),
  LayoutModule,
  ReactiveFormsModule
  ],
  exports: [
    NewPromotionComponent
  ]
})
export class NewPromotionModule { }
