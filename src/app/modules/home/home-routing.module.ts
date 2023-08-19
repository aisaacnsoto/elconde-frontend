import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('../dashboard/dashboard.module').then(mod => mod.DashboardModule)
			},
			{
				path: 'usuarios',
				loadChildren: () => import('../usuarios/usuarios.module').then(mod => mod.UsuariosModule)
			},
			{
				path: 'clientes',
				loadChildren: () => import('../clientes/clientes.module').then(mod => mod.ClientesModule)
			},
			{
				path: 'citas',
				loadChildren: () => import('../citas/citas.module').then(mod => mod.CitasModule)
			},
			{
				path: 'ventas',
				loadChildren: () => import('../ventas/ventas.module').then(mod => mod.VentasModule)
			},
			{
				path: 'caja',
				loadChildren: () => import('../caja/caja.module').then(mod => mod.CajaModule)
			},
			{
				path: 'compras',
				loadChildren: () => import('../compras/compras.module').then(mod => mod.ComprasModule)
			},
			{
				path: 'proveedores',
				loadChildren: () => import('../proveedores/proveedores.module').then(mod => mod.ProveedoresModule)
			},
			{
				path: 'empleados',
				loadChildren: () => import('../empleados/empleados.module').then(mod => mod.EmpleadosModule)
			},
			{
				path: 'productos',
				loadChildren: () => import('../productos/productos.module').then(mod => mod.ProductosModule)
			},
			{
				path: 'servicios',
				loadChildren: () => import('../servicios/servicios.module').then(mod => mod.ServiciosModule)
			},
			{
				path: 'herramientas',
				loadChildren: () => import('../herramientas/herramientas.module').then(mod => mod.HerramientasModule)
			},
			{
				path: 'inventarios',
				loadChildren: () => import('../inventarios/inventarios.module').then(mod => mod.InventariosModule)
			},
			{
				path: 'kardex',
				loadChildren: () => import('../kardex/kardex.module').then(mod => mod.KardexModule)
			},
			{
				path: 'gastos',
				loadChildren: () => import('../gastos/gastos.module').then(m => m.GastosModule)
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
