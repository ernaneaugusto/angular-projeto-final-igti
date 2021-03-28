import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewPromotionComponent } from './new-promotion.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PromotionDetailsModule } from './../promotion-details/promotion-details.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: NewPromotionComponent },
  { path: ':id', component: NewPromotionComponent },
  // { path: ':id/detalhes', component: PromotionDetailsComponent },  
  {
    path: ':id/detalhes',
    loadChildren: () => import('./../promotion-details/promotion-details.module').then(promotionDetails => promotionDetails.PromotionDetailsModule)
  }
]

@NgModule({
  declarations: [
    NewPromotionComponent
  ],
  imports: [
CommonModule,
  RouterModule.forChild(routes),
  SharedModule,
  LayoutModule,
  // @TODO: verificar se tem que exportar PromotionDetailsModule aqui nesse local
  // PromotionDetailsModule,
  ReactiveFormsModule
  ],
  exports: [
    NewPromotionComponent
  ]
})
export class NewPromotionModule { }
