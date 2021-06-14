import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(login => login.LoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/home/home.module').then(home => home.HomeModule),
    canLoad:[LoginGuard]
  },
  {
    path: 'admin/promocao',
    loadChildren: () => import('./pages/new-promotion/new-promotion.module').then(newPromotion => newPromotion.NewPromotionModule),
    canLoad:[LoginGuard]
  },
  {
    path: 'admin/estabelecimento',
    loadChildren: () => import('./pages/establishment/establishment.module').then(establishment => establishment.EstablishmentModule),
    canLoad:[LoginGuard]
  },
  {
    path: 'admin/perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(perfil => perfil.PerfilModule),
    canLoad:[LoginGuard]
  },
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then(landing => landing.LandingModule)
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'login',
  // },
  {
    path: '**',
    component: LoginComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
