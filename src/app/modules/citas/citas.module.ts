import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first

import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitaCalendarComponent } from './components/cita-calendar/cita-calendar.component';
import { CitaCreateComponent } from './components/cita-create/cita-create.component';
import { CitaResolveGuard } from 'src/app/guards/cita-resolve.guard';
import { CitaService } from 'src/app/services/cita.service';
import { SharedModule } from '../shared/shared.module';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ServicioResolveGuard } from 'src/app/guards/servicio-resolve.guard';
import { ServicioService } from 'src/app/services/servicio.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BuscarClienteModule } from '../shared/buscar-cliente.module';
import { CitasComponent } from './citas.component';
import { CitaDetalleComponent } from './components/cita-detalle/cita-detalle.component';
import { RegistrarClienteModule } from '../shared/registrar-cliente.module';
import { CitaBuscarClienteComponent } from './components/cita-buscar-cliente/cita-buscar-cliente.component';
import { EmpleadoBarberoResolveGuard } from 'src/app/guards/empleado-barbero-resolve.guard';
import { ServicioActivosResolveGuard } from 'src/app/guards/servicio-activos-resolve.guard';


@NgModule({
	declarations: [
		CitasComponent,
		CitaCalendarComponent,
		CitaCreateComponent,
		CitaDetalleComponent,
		CitaBuscarClienteComponent,
	],
	imports: [
		CommonModule,
		CitasRoutingModule,
		FullCalendarModule,
		SharedModule,
		RegistrarClienteModule,
		AutocompleteLibModule
	],
	providers: [
		CitaResolveGuard,
		CitaService,
		EmpleadoResolveGuard,
		EmpleadoBarberoResolveGuard,
		EmpleadoService,
		ServicioResolveGuard,
		ServicioActivosResolveGuard,
		ServicioService
	]
})
export class CitasModule { }
