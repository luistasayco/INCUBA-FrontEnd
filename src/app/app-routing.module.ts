import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login',  component: LoginComponent},
  {path: 'main',
    component: LayoutComponent,
    children: [
      //{ path: 'dashboard' , loadChildren:
      //() => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      //canActivate: [AuthGuard]},
      { path: 'dashboard' , loadChildren:
      () => import('./modules/modulo-dashboard/modulo-dashboard.module').then(m => m.DashboardModule),
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
      canActivate: [AuthGuard]},
      { path: 'module-ex' , loadChildren:
      () => import('./modules/modulo-extranet/modulo-extranet.module').then(m => m.ExtranetModule),
      canActivate: [AuthGuard]},
      { path: 'module-sp' , loadChildren:
      () => import('./modules/modulo-vacunacion-spray/modulo-vacunacion-spray.module').then(m => m.VacunacionSprayModule),
      canActivate: [AuthGuard]},
      { path: 'module-su' , loadChildren:
      () => import('./modules/modulo-vacunacion-subcutanea/modulo-vacunacion-subcutanea.module').then(m => m.VacunacionSubCutaneaModule),
      canActivate: [AuthGuard]},
      { path: 'module-si' , loadChildren:
      () => import('./modules/modulo-sim/modulo-sim.module').then(m => m.SIMModule),
      canActivate: [AuthGuard]},
      { path: 'module-sm' , loadChildren:
      () => import('./modules/modulo-sinmi/modulo-sinmi.module').then(m => m.SINMIModule),
      canActivate: [AuthGuard]}
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
