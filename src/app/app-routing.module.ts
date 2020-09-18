import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {path: 'main',
    component: LayoutComponent,
    children: [
      { path: 'dashboard' , loadChildren:
      () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path: 'module-re' , loadChildren:
      () => import('./modules/modulo-registro-equipo/modulo-registro-equipo.module').then(m => m.RegistroEquipoModule)},
      { path: 'module-ef' , loadChildren:
      () => import('./modules/modulo-examen-fisico-pollito/modulo-examen-fisico-pollito.module').then(m => m.ExamenFisicoPollitoModule)}
    ]
  },
  { path: '', redirectTo: 'main/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
