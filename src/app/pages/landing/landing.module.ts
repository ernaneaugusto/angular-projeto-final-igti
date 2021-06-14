import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './../landing/landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';

const routes: Routes = [
  { path: '', component: LandingComponent }
];

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
  
  CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule
  ],
  exports: [
    LandingComponent
  ]
})
export class LandingModule { }
