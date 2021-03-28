import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/home/home.module').then(home => home.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(login => login.LoginModule)
  },
  {
    path: 'admin/promocao',
    loadChildren: () => import('./pages/new-promotion/new-promotion.module').then(newPromotion => newPromotion.NewPromotionModule)
  },
  {
    path: 'admin/estabelecimento',
    loadChildren: () => import('./pages/establishment/establishment.module').then(establishment => establishment.EstablishmentModule)
  },
  {
    path: 'admin/perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(perfil => perfil.PerfilModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
