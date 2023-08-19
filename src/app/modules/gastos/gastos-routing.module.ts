import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosComponent } from './gastos.component';
import { GastoCreateComponent } from './components/gasto-create/gasto-create.component';
import { GastoTipoResolveGuard } from 'src/app/guards/gasto-tipo-resolve.guard';
import { GastoTipoComponent } from './components/gasto-tipo/gasto-tipo.component';
import { GastoTipoListComponent } from './components/gasto-tipo-list/gasto-tipo-list.component';
import { GastoTipoCreateComponent } from './components/gasto-tipo-create/gasto-tipo-create.component';
import { ReportePagoPersonalComponent } from '../reportes/components/reporte-pago-personal/reporte-pago-personal.component';

const routes: Routes = [
	{
		path: '',
		component: GastosComponent,
		children: [
			{
				path: '',
				component: GastoCreateComponent,
				resolve: {
					tipos: GastoTipoResolveGuard
				}
			},
			{
				path: 'reportes/pago-personal',
				component: ReportePagoPersonalComponent
			},
			{
				path: 'tipos',
				component: GastoTipoComponent,
				children: [
					{
						path: '',
						component: GastoTipoListComponent
					},
					{
						path: 'registrar',
						component: GastoTipoCreateComponent
					},
					{
						path: 'editar/:id',
						component: GastoTipoCreateComponent,
						resolve: {
							tipo: GastoTipoResolveGuard
						}
					}
				]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GastosRoutingModule { }
