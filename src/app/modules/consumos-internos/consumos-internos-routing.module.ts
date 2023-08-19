import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumosInternosComponent } from './consumos-internos.component';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { ConsumosInternosCreateComponent } from './components/consumos-internos-create/consumos-internos-create.component';
import { ProductoResolveGuard } from 'src/app/guards/producto-resolve.guard';

const routes: Routes = [
	{
		path: '',
		component: ConsumosInternosComponent,
		children: [
			{
				path: '',
				component: ConsumosInternosCreateComponent,
				resolve: {
					empleados: EmpleadoResolveGuard,
					productos: ProductoResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ConsumosInternosRoutingModule { }
