import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VentasComponent } from './ventas.component';
import { ArchivoVentasComponent } from './components/archivo-ventas/archivo-ventas.component';
import { VentaCreateComponent } from './components/venta-create/venta-create.component';
import { UsuarioResolveGuard } from 'src/app/guards/usuario-resolve.guard';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TicketComponent } from './components/ticket/ticket.component';
import { ClienteDefaultResolveGuard } from 'src/app/guards/cliente-default.guard';
import { ClienteService } from 'src/app/services/cliente.service';
import { BuscarClienteModule } from '../shared/buscar-cliente.module';
import { BuscarProductoModule } from '../shared/buscar-producto.module';
import { RegistrarClienteModule } from '../shared/registrar-cliente.module';
import { VentaResolveGuard } from 'src/app/guards/venta-resolve.guard';
import { VentaService } from 'src/app/services/venta.service';
import { UsuarioCajerosResolveGuard } from 'src/app/guards/usuario-cajeros-resolve.guard';


@NgModule({
	declarations: [
		VentasComponent,
		ArchivoVentasComponent,
		VentaCreateComponent,
		TicketComponent
	],
	imports: [
		CommonModule,
		VentasRoutingModule,
		SharedModule,
		BuscarClienteModule,
		BuscarProductoModule,
		RegistrarClienteModule
	],
	providers: [
		UsuarioResolveGuard,
		UsuarioCajerosResolveGuard,
		UsuarioService,
		ClienteDefaultResolveGuard,
		ClienteService,
		VentaResolveGuard,
		VentaService
	]
})
export class VentasModule { }
