import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProveedorListComponent } from './components/proveedor-list/proveedor-list.component';
import { ProveedorCreateComponent } from './components/proveedor-create/proveedor-create.component';
import { ProveedorResolveGuard } from 'src/app/guards/proveedor.guard';


const routes: Routes = [
	{
		path: '',
		component: ProveedorComponent,
		children: [
			{
				path: '',
				component: ProveedorListComponent
			},
			{
				path: 'registrar',
				component: ProveedorCreateComponent,
			},
			{
				path: 'editar/:id',
				component: ProveedorCreateComponent,
				resolve: {
					proveedor: ProveedorResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
