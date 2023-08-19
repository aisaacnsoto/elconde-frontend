import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionesRoutingModule } from './asignaciones-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AsignacionesComponent } from './asignaciones.component';
import { AsignacionCreateComponent } from './components/asignacion-create/asignacion-create.component';
import { HerramientaResolveGuard } from 'src/app/guards/herramienta-resolve.guard';
import { HerramientaService } from 'src/app/services/herramienta.service';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoPresentacionAsignacionesResolveGuard } from 'src/app/guards/producto-presentacion-asignaciones-resolve.guard';
import { ProductoPresentacionService } from 'src/app/services/producto-presentacion.service';
import { AsignacionBuscarProductoComponent } from './components/asignacion-buscar-producto/asignacion-buscar-producto.component';


@NgModule({
	declarations: [
		AsignacionesComponent,
		AsignacionCreateComponent,
		AsignacionBuscarProductoComponent
	],
	imports: [
		CommonModule,
		AsignacionesRoutingModule,
		SharedModule
	],
	providers: [
		HerramientaResolveGuard,
		HerramientaService,
		ProductoPresentacionAsignacionesResolveGuard,
		ProductoPresentacionService,
		EmpleadoResolveGuard,
		EmpleadoService
	]
})
export class AsignacionesModule { }
