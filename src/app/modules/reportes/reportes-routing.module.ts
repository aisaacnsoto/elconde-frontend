import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesComponent } from './reportes.component';
import { ReporteCierreCajaComponent } from './components/reporte-cierre-caja/reporte-cierre-caja.component';
import { ReportePagoPersonalComponent } from './components/reporte-pago-personal/reporte-pago-personal.component';
import { ReporteGastosMensualComponent } from './components/reporte-gastos-mensual/reporte-gastos-mensual.component';
import { ComisionResolveGuard } from 'src/app/guards/comision-resolve.guard';
import { EmpleadoResolveGuard } from 'src/app/guards/empleado-resolve.guard';
import { ReporteConsumosComponent } from './components/reporte-consumos-internos/reporte-consumos.component';
import { ReporteServiciosVentasComponent } from './components/reporte-servicios-ventas/reporte-servicios-ventas.component';
import { ReporteStockComponent } from './components/reporte-stock/reporte-stock.component';
import { ReporteVentasComponent } from './components/reporte-ventas/reporte-ventas.component';
import { ReporteRentabilidadComponent } from './components/reporte-rentabilidad/reporte-rentabilidad.component';
import { ServicioResolveGuard } from 'src/app/guards/servicio-resolve.guard';
import { ReporteClientesCitasComponent } from './components/reporte-clientes-citas/reporte-clientes-citas.component';
import { ProductoServicioResolveGuard } from 'src/app/guards/producto-servicio-resolve.guard';
import { ProductoResolveGuard } from 'src/app/guards/producto-resolve.guard';
import { ReporteGananciaNetaComponent } from './components/reporte-ganancia-neta/reporte-ganancia-neta.component';


const routes: Routes = [
	{
		path: '',
		component: ReportesComponent,
		children: [
			{
				path: 'cierre-caja',
				component: ReporteCierreCajaComponent,
				children: [
					{
						path: '',
						loadChildren: () => import('./modules/cierre-caja/cierre-caja.module').then(mod => mod.CierreCajaModule),
					}
				]
			},
			{
				path: 'pago-personal',
				component: ReportePagoPersonalComponent
			},
			{
				path: 'gastos',
				component: ReporteGastosMensualComponent
			},
			{
				path: 'ventas-del-dia',
				component: ReporteServiciosVentasComponent
			},
			{
				path: 'ventas',
				component: ReporteVentasComponent,
				resolve: {
					productos: ProductoResolveGuard,
					servicios: ServicioResolveGuard
				}
			},
			{
				path: 'stock',
				component: ReporteStockComponent
			},
			{
				path: 'consumos-internos',
				component: ReporteConsumosComponent
			},
			{
				path: 'rentabilidad',
				component: ReporteRentabilidadComponent
			},
			{
				path: 'clientes-citas',
				component: ReporteClientesCitasComponent
			},
			{
				path: 'ganancia-neta',
				component: ReporteGananciaNetaComponent
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportesRoutingModule { }
