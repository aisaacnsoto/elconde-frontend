import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConfiguracionComponent } from './configuracion.component';
import { AdminConfigComponent } from './components/admin-config/admin-config.component';
import { AdminConfigResolveGuard } from 'src/app/guards/admin-config-resolve.guard';
import { UsuarioService } from 'src/app/services/usuario.service';


@NgModule({
	declarations: [ConfiguracionComponent, AdminConfigComponent],
	imports: [
		CommonModule,
		ConfiguracionRoutingModule,
		SharedModule
	],
	providers: [
		AdminConfigResolveGuard,
		UsuarioService
	]
})
export class ConfiguracionModule { }
