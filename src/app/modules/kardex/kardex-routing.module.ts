import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KardexComponent } from './kardex.component';
import { KardexIndexComponent } from './components/kardex-index/kardex-index.component';
import { ProductoResolveGuard } from 'src/app/guards/producto-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: KardexComponent,
		children: [
			{
				path: '',
				component: KardexIndexComponent,
				resolve: {
					productos: ProductoResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class KardexRoutingModule { }
