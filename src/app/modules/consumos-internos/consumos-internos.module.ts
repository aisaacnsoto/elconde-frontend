import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumosInternosRoutingModule } from './consumos-internos-routing.module';
import { ConsumosInternosComponent } from './consumos-internos.component';
import { ConsumosInternosCreateComponent } from './components/consumos-internos-create/consumos-internos-create.component';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoResolveGuard } from 'src/app/guards/producto-resolve.guard';
import { ProductoService } from 'src/app/services/producto.service';
import { SharedModule } from '../shared/shared.module';
import { ConsumoBuscarProductoComponent } from './components/consumo-buscar-producto/consumo-buscar-producto.component';


@NgModule({
	declarations: [
		ConsumosInternosComponent,
		ConsumosInternosCreateComponent,
		ConsumoBuscarProductoComponent
	],
	imports: [
		CommonModule,
		ConsumosInternosRoutingModule,
		SharedModule
	],
	providers: [
		EmpleadoResolveGuard,
		EmpleadoService,
		ProductoResolveGuard,
		ProductoService
	]
})
export class ConsumosInternosModule { }
