import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: PerfilComponent }
];

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [PerfilComponent]
})
export class PerfilModule { }
