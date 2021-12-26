import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthGuardModule} from '@angular/fire/auth-guard';

import { AppComponent } from './app.component';
import { CuerpoComponent } from './component/cuerpo/cuerpo.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';


import { RegistrerComponent } from './component/registrer/registrer.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FormAuthComponent } from './component/form/form-auth/form-auth.component';
import { MismateriasComponent } from './component/mismaterias/mismaterias.component';






@NgModule({
  declarations: [
    AppComponent,
    CuerpoComponent,
    InicioComponent,
    LoginComponent,
    MenuComponent,
    RegistrerComponent,
    ProfileComponent,
    FormAuthComponent,
    MismateriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
  ],
  providers: [],
  bootstrap: [CuerpoComponent]
})
export class AppModule { }
