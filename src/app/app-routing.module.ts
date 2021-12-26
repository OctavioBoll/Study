import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from '../app/component/inicio/inicio.component';
import { LoginComponent } from '../app/component/login/login.component';
import { RegistrerComponent} from '../app/component/registrer/registrer.component';
import { MismateriasComponent } from './component/mismaterias/mismaterias.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'inicio',component: InicioComponent},
  {path:'login', component: LoginComponent},
  {path:'Registrer', component: RegistrerComponent},
  {path:'Profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'misMaterias', component: MismateriasComponent, canActivate:[AuthGuard]},
  {path:'', redirectTo:'/inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
