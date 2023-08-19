import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ServicioCreateComponent } from './components/servicio-create/servicio-create.component';
import { ServicioListComponent } from './components/servicio-list/servicio-list.component';
import { ServicioResolveGuard } from 'src/app/guards/servicio-resolve.guard';
import { ServicioService } from 'src/app/services/servicio.service';
import { ServicioIdResolveGuard } from 'src/app/guards/servicio-id-resolve.guard';


@NgModule({
	declarations: [ServicioComponent, ServicioCreateComponent, ServicioListComponent],
	imports: [
		CommonModule,
		ServiciosRoutingModule,
		SharedModule
	],
	providers: [
		ServicioResolveGuard,
		ServicioIdResolveGuard,
		ServicioService
	]
})
export class ServiciosModule { }
