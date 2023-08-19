import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocionesRoutingModule } from './promociones-routing.module';
import { PromocionesComponent } from './promociones.component';
import { PromoEspecificosResolveGuard } from 'src/app/guards/promo-especificos-resolve.guard';
import { PromocionService } from 'src/app/services/promocion.service';
import { SharedModule } from '../shared/shared.module';
import { PromocionBuscarServicioComponent } from './promocion-buscar-servicio/promocion-buscar-servicio.component';
import { PromocionBuscarClienteComponent } from './promocion-buscar-cliente/promocion-buscar-cliente.component';
import { ClienteVipCodigosComponent } from './cliente-vip-codigos/cliente-vip-codigos.component';
import { ClienteVIPService } from 'src/app/services/cliente-vip.service';
import { ClienteVIPResolveGuard } from 'src/app/guards/cliente-vip-resolve.guard';
import { ClienteVipCodigosRegisterComponent } from './cliente-vip-codigos-register/cliente-vip-codigos-register.component';
import { ClienteVipBuscarClienteComponent } from './cliente-vip-buscar-cliente/cliente-vip-buscar-cliente.component';

@NgModule({
	declarations: [
		PromocionesComponent,
		PromocionBuscarServicioComponent,
		PromocionBuscarClienteComponent,
		ClienteVipCodigosComponent,
		ClienteVipCodigosRegisterComponent,
		ClienteVipBuscarClienteComponent
	],
	imports: [
		CommonModule,
		PromocionesRoutingModule,
		SharedModule
	],
	providers: [
		PromoEspecificosResolveGuard,
		ClienteVIPResolveGuard,
		ClienteVIPService,
		PromocionService
	]
})
export class PromocionesModule { }
