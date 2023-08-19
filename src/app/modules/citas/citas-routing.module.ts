import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CitaCalendarComponent } from './components/cita-calendar/cita-calendar.component';
import { CitaCreateComponent } from './components/cita-create/cita-create.component';
import { CitaResolveGuard } from 'src/app/guards/cita-resolve.guard';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { ServicioResolveGuard } from 'src/app/guards/servicio-resolve.guard';
import { CitasComponent } from './citas.component';
import { CitaDetalleComponent } from './components/cita-detalle/cita-detalle.component';
import { EmpleadoBarberoResolveGuard } from 'src/app/guards/empleado-barbero-resolve.guard';
import { ServicioActivosResolveGuard } from 'src/app/guards/servicio-activos-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: CitasComponent,
		children: [
			{
				path: '',
				component: CitaCalendarComponent,
				data: {
					title: 'mis citas cargadas'
				},
				resolve: {
					citas: CitaResolveGuard
				}
			},
			{
				path: 'reservar',
				component: CitaCreateComponent,
				data: {
					cargo: 1
				},
				resolve: {
					empleados: EmpleadoBarberoResolveGuard,
					servicios: ServicioActivosResolveGuard
				}
			},
			{
				path: 'editar/:id',
				component: CitaCreateComponent,
				data: {
					cargo: 1
				},
				resolve: {
					cita: CitaResolveGuard,
					empleados: EmpleadoBarberoResolveGuard,
					servicios: ServicioActivosResolveGuard
				}
			},
			{
				path: 'detalle/:id',
				component: CitaDetalleComponent,
				resolve: {
					cita: CitaResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CitasRoutingModule { }
