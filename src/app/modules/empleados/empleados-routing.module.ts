import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosIndexComponent } from './components/empleados-index/empleados-index.component';
import { EmpleadosCreateComponent } from './components/empleados-create/empleados-create.component';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { EmpleadoIDResolveGuard } from 'src/app/guards/empleado-id-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: EmpleadosComponent,
		children: [
			{
				path: '',
				component: EmpleadosIndexComponent
			},
			{
				path: 'registrar',
				component: EmpleadosCreateComponent
			},
			{
				path: 'editar/:id',
				component: EmpleadosCreateComponent,
				resolve: {
					empleado: EmpleadoIDResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
