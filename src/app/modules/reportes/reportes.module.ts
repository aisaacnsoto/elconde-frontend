import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { ReporteCierreCajaComponent } from './components/reporte-cierre-caja/reporte-cierre-caja.component';
import { ReportePagoPersonalComponent } from './components/reporte-pago-personal/reporte-pago-personal.component';
import { ReporteGastosMensualComponent } from './components/reporte-gastos-mensual/reporte-gastos-mensual.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderModule } from '../shared/loader.module';
import { ReporteService } from 'src/app/services/reporte.service';
import { ComisionResolveGuard } from 'src/app/guards/comision-resolve.guard';
import { GlobalService } from 'src/app/services/global.service';
import { ReporteConsumosComponent } from './components/reporte-consumos-internos/reporte-consumos.component';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ReporteServiciosVentasComponent } from './components/reporte-servicios-ventas/reporte-servicios-ventas.component';
import { ReporteStockComponent } from './components/reporte-stock/reporte-stock.component';
import { ReporteVentasComponent } from './components/reporte-ventas/reporte-ventas.component';
import { ReporteRentabilidadComponent } from './components/reporte-rentabilidad/reporte-rentabilidad.component';
import { ServicioResolveGuard } from 'src/app/guards/servicio-resolve.guard';
import { ServicioService } from 'src/app/services/servicio.service';
import { ReporteClientesCitasComponent } from './components/reporte-clientes-citas/reporte-clientes-citas.component';
import { ReporteClientesCitasBuscarComponent } from './components/reporte-clientes-citas/reporte-clientes-citas-buscar/reporte-clientes-citas-buscar.component';
import { ProductoServicioService } from 'src/app/services/producto.servicio.service';
import { ProductoServicioResolveGuard } from 'src/app/guards/producto-servicio-resolve.guard';
import { ProductoResolveGuard } from 'src/app/guards/producto-resolve.guard';
import { ProductoService } from 'src/app/services/producto.service';
import { ReporteGananciaNetaComponent } from './components/reporte-ganancia-neta/reporte-ganancia-neta.component';


@NgModule({
	declarations: [
		ReportesComponent,
		ReporteCierreCajaComponent,
		ReportePagoPersonalComponent,
		ReporteGastosMensualComponent,
		ReporteConsumosComponent,
		ReporteServiciosVentasComponent,
		ReporteStockComponent,
		ReporteVentasComponent,
		ReporteRentabilidadComponent,
		ReporteClientesCitasComponent,
		ReporteClientesCitasBuscarComponent,
		ReporteGananciaNetaComponent
	],
	imports: [
		CommonModule,
		ReportesRoutingModule,
		SharedModule,
		LoaderModule
	],
	providers: [
		ProductoResolveGuard,
		ProductoService,
		ServicioResolveGuard,
		ServicioService,
		EmpleadoResolveGuard,
		EmpleadoService,
		ComisionResolveGuard,
		GlobalService,
		ReporteService
	]
})
export class ReportesModule { }
