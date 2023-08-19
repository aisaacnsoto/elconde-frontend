import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerramientasRoutingModule } from './herramientas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HerramientasComponent } from './herramientas.component';
import { HerramientasIndexComponent } from './components/herramientas-index/herramientas-index.component';
import { HerramientasCreateComponent } from './components/herramientas-create/herramientas-create.component';
import { HerramientaResolveGuard } from 'src/app/guards/herramienta-resolve.guard';
import { HerramientaService } from 'src/app/services/herramienta.service';


@NgModule({
	declarations: [
		HerramientasComponent,
		HerramientasIndexComponent,
		HerramientasCreateComponent
	],
	imports: [
		CommonModule,
		HerramientasRoutingModule,
		SharedModule
	],
	providers: [
		HerramientaResolveGuard,
		HerramientaService
	]
})
export class HerramientasModule { }
