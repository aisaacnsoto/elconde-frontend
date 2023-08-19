import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoLocalRoutingModule } from './pago-local-routing.module';
import { PagoLocalComponent } from './pago-local.component';
import { PagoLocalIndexComponent } from './components/pago-local-index/pago-local-index.component';
import { PagoLocalCreateComponent } from './components/pago-local-create/pago-local-create.component';
import { SharedModule } from '../shared/shared.module';
import { PagoLocalService } from 'src/app/services/pago-local.service';
import { PagoLocalResolveGuard } from 'src/app/guards/pago-local-resolve.guard';


@NgModule({
	declarations: [
		PagoLocalComponent,
		PagoLocalIndexComponent,
		PagoLocalCreateComponent
	],
	imports: [
		CommonModule,
		PagoLocalRoutingModule,
		SharedModule
	],
	providers: [
		PagoLocalResolveGuard,
		PagoLocalService
	]
})
export class PagoLocalModule { }
