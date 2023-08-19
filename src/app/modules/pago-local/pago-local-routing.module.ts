import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagoLocalResolveGuard } from 'src/app/guards/pago-local-resolve.guard';
import { PagoLocalCreateComponent } from './components/pago-local-create/pago-local-create.component';
import { PagoLocalIndexComponent } from './components/pago-local-index/pago-local-index.component';

import { PagoLocalComponent } from './pago-local.component';

const routes: Routes = [
	{
		path: '',
		component: PagoLocalComponent,
		children: [
			{
				path: '',
				component: PagoLocalIndexComponent
			},
			{
				path: 'registrar',
				component: PagoLocalCreateComponent
			},
			{
				path: 'editar/:id',
				component: PagoLocalCreateComponent,
				resolve: {
					pago: PagoLocalResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagoLocalRoutingModule { }
