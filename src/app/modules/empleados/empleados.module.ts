import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosIndexComponent } from './components/empleados-index/empleados-index.component';
import { EmpleadosCreateComponent } from './components/empleados-create/empleados-create.component';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { EmpleadoIDResolveGuard } from 'src/app/guards/empleado-id-resolve.guard';


@NgModule({
	declarations: [
		EmpleadosComponent,
		EmpleadosIndexComponent,
		EmpleadosCreateComponent
	],
	imports: [
		CommonModule,
		EmpleadosRoutingModule,
		SharedModule
	],
	providers: [
		EmpleadoResolveGuard,
		EmpleadoIDResolveGuard,
		EmpleadoService
	]
})
export class EmpleadosModule { }
