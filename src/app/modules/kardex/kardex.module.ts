import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KardexRoutingModule } from './kardex-routing.module';
import { SharedModule } from '../shared/shared.module';
import { KardexComponent } from './kardex.component';
import { KardexIndexComponent } from './components/kardex-index/kardex-index.component';
import { ProductoResolveGuard } from 'src/app/guards/producto-resolve.guard';
import { ProductoService } from 'src/app/services/producto.service';


@NgModule({
	declarations: [
		KardexComponent,
		KardexIndexComponent
	],
	imports: [
		CommonModule,
		KardexRoutingModule,
		SharedModule
	],
	providers: [
		ProductoResolveGuard,
		ProductoService
	]
})
export class KardexModule { }
