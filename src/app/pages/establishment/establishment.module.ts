import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EstablishmentComponent } from './establishment.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: EstablishmentComponent }
];

@NgModule({
  declarations: [EstablishmentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [EstablishmentComponent]
})
export class EstablishmentModule { }
