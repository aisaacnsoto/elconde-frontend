import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivoVentasComponent } from './components/archivo-ventas/archivo-ventas.component';
import { VentaCreateComponent } from './components/venta-create/venta-create.component';
import { VentasComponent } from './ventas.component';
import { UsuarioResolveGuard } from 'src/app/guards/usuario-resolve.guard';
import { ClienteDefaultResolveGuard } from 'src/app/guards/cliente-default.guard';
import { VentaResolveGuard } from 'src/app/guards/venta-resolve.guard';
import { UsuarioCajerosResolveGuard } from 'src/app/guards/usuario-cajeros-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: VentasComponent,
		children: [
			{
				path: '',
				component: VentaCreateComponent,
				resolve: {
					cliente: ClienteDefaultResolveGuard,
					cajeros: UsuarioCajerosResolveGuard
				}
			},
			{
				path: 'editar/:id',
				component: VentaCreateComponent,
				resolve: {
					cliente: ClienteDefaultResolveGuard,
					venta: VentaResolveGuard,
					cajeros: UsuarioCajerosResolveGuard
				}
			},
			{
				path: 'archivo',
				component: ArchivoVentasComponent,
				resolve: {
					cajeros: UsuarioResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VentasRoutingModule { }
