import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './modules/login/components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { PermisoCanactivateGuard } from './guards/permiso-canactivate.guard';
import { AccesoDenegadoComponent } from './modules/home/acceso-denegado/acceso-denegado.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
		path: 'login',
		component: LoginComponent
	},
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: WelcomeComponent
			},
			{
				path: 'acceso-denegado',
				component: AccesoDenegadoComponent
			},
			{
				path: 'asignaciones',
				loadChildren: () => import('./modules/asignaciones/asignaciones.module').then(mod => mod.AsignacionesModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'usuarios',
				loadChildren: () => import('./modules/usuarios/usuarios.module').then(mod => mod.UsuariosModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'clientes',
				loadChildren: () => import('./modules/clientes/clientes.module').then(mod => mod.ClientesModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'citas',
				loadChildren: () => import('./modules/citas/citas.module').then(mod => mod.CitasModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'ventas',
				loadChildren: () => import('./modules/ventas/ventas.module').then(mod => mod.VentasModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'caja',
				loadChildren: () => import('./modules/caja/caja.module').then(mod => mod.CajaModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'compras',
				loadChildren: () => import('./modules/compras/compras.module').then(mod => mod.ComprasModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'proveedores',
				loadChildren: () => import('./modules/proveedores/proveedores.module').then(mod => mod.ProveedoresModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'empleados',
				loadChildren: () => import('./modules/empleados/empleados.module').then(mod => mod.EmpleadosModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'productos',
				loadChildren: () => import('./modules/productos/productos.module').then(mod => mod.ProductosModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'servicios',
				loadChildren: () => import('./modules/servicios/servicios.module').then(mod => mod.ServiciosModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'inventarios',
				loadChildren: () => import('./modules/inventarios/inventarios.module').then(mod => mod.InventariosModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'kardex',
				loadChildren: () => import('./modules/kardex/kardex.module').then(mod => mod.KardexModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'gastos',
				loadChildren: () => import('./modules/gastos/gastos.module').then(m => m.GastosModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'reportes',
				loadChildren: () => import('./modules/reportes/reportes.module').then(m => m.ReportesModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'consumos-internos',
				loadChildren: () => import('./modules/consumos-internos/consumos-internos.module').then(m => m.ConsumosInternosModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'configuracion',
				loadChildren: () => import('./modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'promociones',
				loadChildren: () => import('./modules/promociones/promociones.module').then(m => m.PromocionesModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'pago-adicional',
				loadChildren: () => import('./modules/pago-adicional/pago-adicional.module').then(m => m.PagoAdicionalModule),
				canLoad: [AuthGuard]
			},
		]
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
