import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { ProgressBarModule } from 'primeng/progressbar';


const routes: Routes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, ProgressBarModule]
})
export class LoginRoutingModule {}
