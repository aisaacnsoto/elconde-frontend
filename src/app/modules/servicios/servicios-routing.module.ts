import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ServicioListComponent } from './components/servicio-list/servicio-list.component';
import { ServicioCreateComponent } from './components/servicio-create/servicio-create.component';
import { ServicioResolveGuard } from 'src/app/guards/servicio-resolve.guard';
import { ServicioIdResolveGuard } from 'src/app/guards/servicio-id-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: ServicioComponent,
		children: [
			{
				path: '',
				component: ServicioListComponent
			},
			{
				path: 'registrar',
				component: ServicioCreateComponent,
			},
			{
				path: 'editar/:id',
				component: ServicioCreateComponent,
				resolve: {
					servicio: ServicioIdResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ServiciosRoutingModule { }
