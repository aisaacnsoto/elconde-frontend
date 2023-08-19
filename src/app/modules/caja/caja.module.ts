import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CajaComponent } from './caja.component';
import { CajaAperturaComponent } from './components/caja-apertura/caja-apertura.component';
import { CajaCierreComponent } from './components/caja-cierre/caja-cierre.component';
import { CajaAperturaResolveGuard } from 'src/app/guards/caja-apertura-resolve.guard';
import { CajaAperturaService } from 'src/app/services/caja-apertura.service';
import { CajaCierreResolveGuard } from 'src/app/guards/caja-cierre-resolve.guard';
import { CajaCierreService } from 'src/app/services/caja-cierre.service';


@NgModule({
	declarations: [
		CajaComponent,
		CajaAperturaComponent,
		CajaCierreComponent
	],
	imports: [
		CommonModule,
		CajaRoutingModule,
		SharedModule
	],
	providers: [
		CajaAperturaResolveGuard,
		CajaAperturaService,
		CajaCierreResolveGuard,
		CajaCierreService
	]
})
export class CajaModule { }
