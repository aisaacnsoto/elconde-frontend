import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HerramientasComponent } from './herramientas.component';
import { HerramientasIndexComponent } from './components/herramientas-index/herramientas-index.component';
import { HerramientasCreateComponent } from './components/herramientas-create/herramientas-create.component';
import { HerramientaResolveGuard } from 'src/app/guards/herramienta-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: HerramientasComponent,
		children: [
			{
				path: '',
				component: HerramientasIndexComponent
			},
			{
				path: 'registrar',
				component: HerramientasCreateComponent
			},
			{
				path: 'editar/:id',
				component: HerramientasCreateComponent,
				resolve: {
					herramienta: HerramientaResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HerramientasRoutingModule { }
