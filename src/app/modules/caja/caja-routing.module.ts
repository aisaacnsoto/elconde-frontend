import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CajaComponent } from './caja.component';
import { CajaAperturaComponent } from './components/caja-apertura/caja-apertura.component';
import { CajaCierreComponent } from './components/caja-cierre/caja-cierre.component';
import { CajaAperturaResolveGuard } from 'src/app/guards/caja-apertura-resolve.guard';
import { CajaCierreResolveGuard } from 'src/app/guards/caja-cierre-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: CajaComponent,
		children: [
			{
				path: 'apertura',
				component: CajaAperturaComponent,
				resolve: {
					apertura: CajaAperturaResolveGuard
				}
			},
			{
				path: 'cierre',
				component: CajaCierreComponent,
				resolve: {
					cierre: CajaCierreResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CajaRoutingModule { }
