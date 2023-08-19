import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromocionesComponent } from './promociones.component';
import { PromoEspecificosResolveGuard } from 'src/app/guards/promo-especificos-resolve.guard';
import { ClienteVipCodigosComponent } from './cliente-vip-codigos/cliente-vip-codigos.component';
import { ClienteVIPResolveGuard } from 'src/app/guards/cliente-vip-resolve.guard';
import { ClienteVipCodigosRegisterComponent } from './cliente-vip-codigos-register/cliente-vip-codigos-register.component';

const routes: Routes = [
	{
		path: '',
		component: PromocionesComponent,
		resolve: {
			promociones: PromoEspecificosResolveGuard
		},
	},
	{
		path: 'clientes-vip/codigos',
		component: ClienteVipCodigosComponent
	},
	{
		path: 'clientes-vip/codigos/registrar',
		component: ClienteVipCodigosRegisterComponent
	},
	{
		path: 'clientes-vip/codigos/editar/:id',
		component: ClienteVipCodigosRegisterComponent,
		resolve: {
			clienteVIP: ClienteVIPResolveGuard
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PromocionesRoutingModule { }
