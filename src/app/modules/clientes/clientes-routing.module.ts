import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente-create/cliente-create.component';
import { ClienteResolveGuard } from 'src/app/guards/cliente.guard';


const routes: Routes = [
	{
		path: '',
		component: ClienteComponent,
		children: [
			{
				path: '',
				component: ClienteListComponent
			},
			{
				path: 'registrar',
				component: ClienteCreateComponent
			},
			{
				path: 'editar/:id',
				component: ClienteCreateComponent,
				resolve: {
					cliente: ClienteResolveGuard
				}
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientesRoutingModule { }
