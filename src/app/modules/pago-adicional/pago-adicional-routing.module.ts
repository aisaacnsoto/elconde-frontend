import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagoAdicionalResolveGuard } from 'src/app/guards/pago-adicional-resolve.guard';
import { PagoAdicionalTipoIdResolveGuard } from 'src/app/guards/pago-adicional-tipo-id-resolve.guard';
import { PagoAdicionalTipoResolveGuard } from 'src/app/guards/pago-adicional-tipo-resolve.guard';
import { PagoAdicionalCreateComponent } from './components/pago-adicional-create/pago-adicional-create.component';
import { PagoAdicionalIndexComponent } from './components/pago-adicional-index/pago-adicional-index.component';
import { PagoAdicionalTipoCreateComponent } from './components/pago-adicional-tipo-create/pago-adicional-tipo-create.component';
import { PagoAdicionalTipoComponent } from './components/pago-adicional-tipo/pago-adicional-tipo.component';

import { PagoAdicionalComponent } from './pago-adicional.component';

const routes: Routes = [
	{
		path: '',
		component: PagoAdicionalComponent,
		children: [
			{
				path: '',
				component: PagoAdicionalIndexComponent
			},
			{
				path: 'registrar',
				component: PagoAdicionalCreateComponent,
				resolve: {
					tipos: PagoAdicionalTipoResolveGuard
				}
			},
			{
				path: 'editar/:id',
				component: PagoAdicionalCreateComponent,
				resolve: {
					pago: PagoAdicionalResolveGuard,
					tipos: PagoAdicionalTipoResolveGuard
				}
			},
			{
				path: 'tipos',
				component: PagoAdicionalTipoComponent
			},
			{
				path: 'tipos/registrar',
				component: PagoAdicionalTipoCreateComponent
			},
			{
				path: 'tipos/editar/:id',
				component: PagoAdicionalTipoCreateComponent,
				resolve: {
					tipo: PagoAdicionalTipoIdResolveGuard
				}
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagoAdicionalRoutingModule { }
