import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CierreCajaRoutingModule } from './cierre-caja-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CierreCajaComponent } from './cierre-caja.component';

@NgModule({
	declarations: [
		CierreCajaComponent
	],
	imports: [
		CommonModule,
		CierreCajaRoutingModule,
		SharedModule
	]
})
export class CierreCajaModule { }
