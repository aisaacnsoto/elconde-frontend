import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoCreateComponent } from './components/producto-create/producto-create.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoResolveGuard } from 'src/app/guards/producto-resolve.guard';
import { ProductoCategoriaResolveGuard } from 'src/app/guards/producto-categoria-resolve.guard';
import { ProductosCategoriasComponent } from './components/productos-categorias/productos-categorias.component';
import { ProductosCategoriasIndexComponent } from './components/productos-categorias-index/productos-categorias-index.component';
import { ProductosCategoriasCreateComponent } from './components/productos-categorias-create/productos-categorias-create.component';
import { ProductoCategoriaIDResolveGuard } from 'src/app/guards/producto-categoria-id-resolve.guard';
import { UnidadMedidaComponent } from './components/unidad-medida/unidad-medida.component';
import { UnidadMedidaIndexComponent } from './components/unidad-medida-index/unidad-medida-index.component';
import { UnidadMedidaCreateComponent } from './components/unidad-medida-create/unidad-medida-create.component';
import { UnidadMedidaIDResolveGuard } from 'src/app/guards/unidad-medida-id-resolve.guard';
import { UnidadMedidaResolveGuard } from 'src/app/guards/unidadad-medida-resolve.guard';
import { FormaPresentacionComponent } from './components/forma-presentacion/forma-presentacion.component';
import { ProductoPresentacionResolveGuard } from 'src/app/guards/producto-presentacion-resolve.guard';


const routes: Routes = [
	{
		path: '',
		component: ProductoComponent,
		children: [
			{
				path: '',
				component: ProductoListComponent,
				resolve: {
					productos: ProductoResolveGuard
				}
			},
			{
				path: 'registrar',
				component: ProductoCreateComponent,
				resolve: {
					categorias: ProductoCategoriaResolveGuard
				}
			},
			{
				path: 'editar/:id',
				component: ProductoCreateComponent,
				resolve: {
					categorias: ProductoCategoriaResolveGuard,
					producto: ProductoResolveGuard
				}
			},
			{
				path: 'categorias',
				component: ProductosCategoriasComponent,
				children: [
					{
						path: '',
						component: ProductosCategoriasIndexComponent
					},
					{
						path: 'registrar',
						component: ProductosCategoriasCreateComponent
					},
					{
						path: 'editar/:id',
						component: ProductosCategoriasCreateComponent,
						resolve: {
							categoria: ProductoCategoriaIDResolveGuard
							
						}
					},
				]
			},
			{
				path: 'unidades-medida',
				component: UnidadMedidaComponent,
				children: [
					{
						path: '',
						component: UnidadMedidaIndexComponent
					},
					{
						path: 'registrar',
						component: UnidadMedidaCreateComponent
					},
					{
						path: 'editar/:id',
						component: UnidadMedidaCreateComponent,
						resolve: {
							unidad: UnidadMedidaIDResolveGuard
							
						}
					},
				]
			},
			{
				path: 'presentaciones/:id',
				component: FormaPresentacionComponent,
				resolve: {
					producto: ProductoResolveGuard,
					unidades_medida: UnidadMedidaResolveGuard
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductosRoutingModule { }
