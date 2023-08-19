import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';
import { AdminConfigComponent } from './components/admin-config/admin-config.component';
import { AdminConfigResolveGuard } from 'src/app/guards/admin-config-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: ConfiguracionComponent,
		children: [
			{
				path: 'admin',
				component: AdminConfigComponent,
				resolve: {
					admin: AdminConfigResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
