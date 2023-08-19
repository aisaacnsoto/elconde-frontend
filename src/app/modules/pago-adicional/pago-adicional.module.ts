import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoAdicionalRoutingModule } from './pago-adicional-routing.module';
import { PagoAdicionalComponent } from './pago-adicional.component';
import { PagoAdicionalTipoComponent } from './components/pago-adicional-tipo/pago-adicional-tipo.component';
import { PagoAdicionalTipoCreateComponent } from './components/pago-adicional-tipo-create/pago-adicional-tipo-create.component';
import { PagoAdicionalIndexComponent } from './components/pago-adicional-index/pago-adicional-index.component';
import { PagoAdicionalCreateComponent } from './components/pago-adicional-create/pago-adicional-create.component';
import { PagoAdicionalResolveGuard } from 'src/app/guards/pago-adicional-resolve.guard';
import { PagoAdicionalTipoResolveGuard } from 'src/app/guards/pago-adicional-tipo-resolve.guard';
import { PagoAdicionalService } from 'src/app/services/pago-adicional.service';
import { PagoAdicionalTipoService } from 'src/app/services/pago-adicional-tipo.service';
import { SharedModule } from '../shared/shared.module';
import { PagoAdicionalTipoIdResolveGuard } from 'src/app/guards/pago-adicional-tipo-id-resolve.guard';


@NgModule({
	declarations: [
		PagoAdicionalComponent,
		PagoAdicionalTipoComponent,
		PagoAdicionalTipoCreateComponent,
		PagoAdicionalIndexComponent,
		PagoAdicionalCreateComponent
	],
	imports: [
		CommonModule,
		PagoAdicionalRoutingModule,
		SharedModule
	],
	providers: [
		PagoAdicionalResolveGuard,
		PagoAdicionalTipoResolveGuard,
		PagoAdicionalTipoIdResolveGuard,
		PagoAdicionalService,
		PagoAdicionalTipoService
	]
})
export class PagoAdicionalModule { }
