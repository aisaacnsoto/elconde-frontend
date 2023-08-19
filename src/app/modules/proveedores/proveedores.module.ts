import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProveedorCreateComponent } from './components/proveedor-create/proveedor-create.component';
import { ProveedorListComponent } from './components/proveedor-list/proveedor-list.component';
import { ProveedorResolveGuard } from 'src/app/guards/proveedor.guard';
import { ProveedorService } from 'src/app/services/proveedor.service';


@NgModule({
	declarations: [ProveedorComponent, ProveedorCreateComponent, ProveedorListComponent],
	imports: [
		CommonModule,
		ProveedoresRoutingModule,
		SharedModule
	],
	providers: [
		ProveedorResolveGuard,
		ProveedorService
	]
})
export class ProveedoresModule { }
