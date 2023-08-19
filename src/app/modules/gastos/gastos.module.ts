import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosComponent } from './gastos.component';
import { SharedModule } from '../shared/shared.module';
import { GastoCreateComponent } from './components/gasto-create/gasto-create.component';
import { GastoTipoComponent } from './components/gasto-tipo/gasto-tipo.component';
import { GastoTipoCreateComponent } from './components/gasto-tipo-create/gasto-tipo-create.component';
import { GastoTipoListComponent } from './components/gasto-tipo-list/gasto-tipo-list.component';
import { GastoTipoResolveGuard } from 'src/app/guards/gasto-tipo-resolve.guard';
import { GastoTipoService } from 'src/app/services/gasto-tipo.service';
import { ReportesModule } from '../reportes/reportes.module';


@NgModule({
	declarations: [
		GastosComponent,
		GastoCreateComponent,
		GastoTipoComponent,
		GastoTipoCreateComponent,
		GastoTipoListComponent
	],
	imports: [
		CommonModule,
		GastosRoutingModule,
		SharedModule,
		ReportesModule
	],
	providers: [
		GastoTipoResolveGuard,
		GastoTipoService
	]
})
export class GastosModule { }
