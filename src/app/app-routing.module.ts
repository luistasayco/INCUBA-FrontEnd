import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: 'login',  component: LoginComponent},
  {path: 'main',
    component: LayoutComponent,
    children: [
      { path: 'dashboard' , loadChildren:
      () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [AuthGuard]},
      { path: 'module-re' , loadChildren:
      () => import('./modules/modulo-registro-equipo/modulo-registro-equipo.module').then(m => m.RegistroEquipoModule),
      canActivate: [AuthGuard]},
      { path: 'module-ef' , loadChildren:
      () => import('./modules/modulo-examen-fisico-pollito/modulo-examen-fisico-pollito.module').then(m => m.ExamenFisicoPollitoModule),
      canActivate: [AuthGuard]},
      { path: 'module-se' , loadChildren:
      () => import('./modules/modulo-seguridad/modulo-seguridad.module').then(m => m.SeguridadModule),
      canActivate: [AuthGuard]},
      { path: 'module-si' , loadChildren:
      () => import('./modules/modulo-sincronizacion/modulo-sincronizacion.module').then(m => m.SincronizacionModule),
      canActivate: [AuthGuard]}
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
