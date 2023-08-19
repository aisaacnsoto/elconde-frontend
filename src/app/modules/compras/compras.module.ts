import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComprasComponent } from './compras.component';
import { ComprasListComponent } from './components/compras-list/compras-list.component';
import { ComprasCreateComponent } from './components/compras-create/compras-create.component';
import { BuscarProveedorComponent } from './components/buscar-proveedor/buscar-proveedor.component';
import { BuscarProductoModule } from '../shared/buscar-producto.module';
import { CompraResolveGuard } from 'src/app/guards/compra-resolve.guard';
import { CompraService } from 'src/app/services/compra.service';


@NgModule({
	declarations: [
		ComprasComponent,
		ComprasListComponent,
		ComprasCreateComponent,
		BuscarProveedorComponent
	],
	imports: [
		CommonModule,
		ComprasRoutingModule,
		SharedModule,
		BuscarProductoModule
	],
	providers: [
		CompraResolveGuard,
		CompraService
	]
})
export class ComprasModule { }
