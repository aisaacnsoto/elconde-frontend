import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgProgressModule } from 'ngx-progressbar';

import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { UsuarioService } from './services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/login/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './modules/home/components/home/home.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AccesoDenegadoComponent } from './modules/home/acceso-denegado/acceso-denegado.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
		Page404Component,
		HomeComponent,
		LoginComponent,
		TopbarComponent,
		SidebarComponent,
		FooterComponent,
		AccesoDenegadoComponent,
		WelcomeComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		NgProgressModule.withConfig({
			thick: true,
			trickleSpeed: 200,
			meteor: false
		}),
		HttpClientModule,
		FormsModule,
		NgxSpinnerModule
  ],
  providers: [
    AuthGuard,
		UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
