import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioCreateComponent } from './components/usuario-create/usuario-create.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';

import { PermisoService } from 'src/app/services/permiso.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';


import { UsuarioResolveGuard } from 'src/app/guards/usuario-resolve.guard';
import { PermisoResolveGuard } from 'src/app/guards/permiso-resolve.guard';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { RolResolveGuard } from 'src/app/guards/rol-resolve.guard';
import { RolService } from 'src/app/services/rol.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		UsuarioComponent,
		UsuarioCreateComponent,
		UsuarioListComponent,
	],
	imports: [
		CommonModule,
		UsuariosRoutingModule,
		SharedModule // Modulo con directivas
	],
	providers: [
		PermisoResolveGuard,
		PermisoService,
		EmpleadoResolveGuard,
		EmpleadoService,
		UsuarioResolveGuard,
		UsuarioService,
		RolResolveGuard,
		RolService
	]
})
export class UsuariosModule { }
