import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignacionesComponent } from './asignaciones.component';
import { AsignacionCreateComponent } from './components/asignacion-create/asignacion-create.component';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: AsignacionesComponent,
		children: [
			{
				path: '',
				component: AsignacionCreateComponent,
				resolve: {
					empleados: EmpleadoResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AsignacionesRoutingModule { }
