import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventariosRoutingModule } from './inventarios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InventariosComponent } from './inventarios.component';
import { InventariosIndexComponent } from './components/inventarios-index/inventarios-index.component';
import { InventariosCreateComponent } from './components/inventarios-create/inventarios-create.component';
import { InventariosBuscarProductoComponent } from './components/inventarios-buscar-producto/inventarios-buscar-producto.component';
import { LoaderModule } from '../shared/loader.module';
import { InventarioResolveGuard } from 'src/app/guards/inventario-resolve.guard';
import { InventarioService } from 'src/app/services/inventario.service';


@NgModule({
	declarations: [
		InventariosComponent,
		InventariosIndexComponent,
		InventariosCreateComponent,
		InventariosBuscarProductoComponent
	],
	imports: [
		CommonModule,
		InventariosRoutingModule,
		SharedModule,
		LoaderModule
	],
	providers: [
		InventarioResolveGuard,
		InventarioService
	]
})
export class InventariosModule { }
