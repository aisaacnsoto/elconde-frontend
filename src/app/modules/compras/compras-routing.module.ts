import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprasComponent } from './compras.component';
import { ComprasListComponent } from './components/compras-list/compras-list.component';
import { ComprasCreateComponent } from './components/compras-create/compras-create.component';
import { CompraResolveGuard } from 'src/app/guards/compra-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: ComprasComponent,
		children: [
			{
				path: '',
				component: ComprasListComponent
			},
			{
				path: 'registrar',
				component: ComprasCreateComponent
			},
			{
				path: 'editar/:id',
				component: ComprasCreateComponent,
				resolve: {
					compra: CompraResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ComprasRoutingModule { }
