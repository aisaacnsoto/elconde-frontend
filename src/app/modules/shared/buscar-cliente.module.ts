import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VentaBuscarClienteComponent } from '../ventas/components/venta-buscar-cliente/venta-buscar-cliente.component';

@NgModule({
	declarations: [
		VentaBuscarClienteComponent
	],
	exports: [
		VentaBuscarClienteComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule
	]
})
export class BuscarClienteModule { }
