import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VentaBuscarClienteComponent } from '../ventas/components/venta-buscar-cliente/venta-buscar-cliente.component';
import { VentaBuscarProductoComponent } from '../ventas/components/venta-buscar-producto/venta-buscar-producto.component';
import { LoaderComponent } from '../home/components/loader/loader.component';
import { LoaderModule } from './loader.module';
import { CompraBuscarProductoComponent } from '../compras/components/compra-buscar-producto/compra-buscar-producto.component';

@NgModule({
	declarations: [
		VentaBuscarProductoComponent,
		CompraBuscarProductoComponent
	],
	exports: [
		VentaBuscarProductoComponent,
		CompraBuscarProductoComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		LoaderModule
	]
})
export class BuscarProductoModule { }
