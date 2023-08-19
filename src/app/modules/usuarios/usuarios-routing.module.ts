import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './components/usuario-create/usuario-create.component';
import { PermisoResolveGuard } from 'src/app/guards/permiso-resolve.guard';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { UsuarioResolveGuard } from 'src/app/guards/usuario-resolve.guard';
import { RolResolveGuard } from 'src/app/guards/rol-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: UsuarioComponent,
		children: [
			{
				path: '',
				component: UsuarioListComponent
			},
			{
				path: 'registrar',
				component: UsuarioCreateComponent,
				resolve: {
					permisos: PermisoResolveGuard,
					empleados: EmpleadoResolveGuard,
					roles: RolResolveGuard
				}
			},
			{
				path: 'editar/:id',
				component: UsuarioCreateComponent,
				resolve: {
					permisos: PermisoResolveGuard,
					empleados: EmpleadoResolveGuard,
					roles: RolResolveGuard,
					usuario: UsuarioResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsuariosRoutingModule { }
