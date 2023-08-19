import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventariosComponent } from './inventarios.component';
import { InventariosIndexComponent } from './components/inventarios-index/inventarios-index.component';
import { InventariosCreateComponent } from './components/inventarios-create/inventarios-create.component';
import { InventarioResolveGuard } from 'src/app/guards/inventario-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: InventariosComponent,
		children: [
			{
				path: '',
				component: InventariosIndexComponent
			},
			{
				path: 'registrar',
				component: InventariosCreateComponent
			},
			{
				path: 'editar/:id',
				component: InventariosCreateComponent,
				resolve: {
					inventario: InventarioResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InventariosRoutingModule { }
