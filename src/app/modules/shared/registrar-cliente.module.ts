import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarClienteComponent } from './components/registrar-cliente.component';
import { SharedModule } from './shared.module';



@NgModule({
	declarations: [
		RegistrarClienteComponent
	],
	exports: [
		RegistrarClienteComponent
	],
	imports: [
		CommonModule,
		SharedModule
	]
})
export class RegistrarClienteModule { }
