import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { TopbarComponent } from 'src/app/layout/topbar/topbar.component';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { AccesoDenegadoComponent } from './acceso-denegado/acceso-denegado.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    HomeComponent,
    AccesoDenegadoComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ]
})
export class HomeModule { }
