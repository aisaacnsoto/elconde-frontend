import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CierreCajaComponent } from './cierre-caja.component';

const routes: Routes = [
	{
		path: '',
		component: CierreCajaComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CierreCajaRoutingModule { }
