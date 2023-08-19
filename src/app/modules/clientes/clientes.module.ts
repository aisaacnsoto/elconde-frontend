import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente-create/cliente-create.component';
import { SharedModule } from '../shared/shared.module';
import { ClienteResolveGuard } from 'src/app/guards/cliente.guard';
import { ClienteService } from 'src/app/services/cliente.service';


@NgModule({
	declarations: [ClienteComponent, ClienteListComponent, ClienteCreateComponent],
	imports: [
		CommonModule,
		ClientesRoutingModule,
		SharedModule
	],
	providers: [
		ClienteResolveGuard,
		ClienteService
	]
})
export class ClientesModule { }
