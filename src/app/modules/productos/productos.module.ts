import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { ProductoCreateComponent } from './components/producto-create/producto-create.component';
import { ProductoFilterComponent } from './components/producto-filter/producto-filter.component';
import { ProductoTileComponent } from './components/producto-tile/producto-tile.component';
import { ProductoBreadcrumbComponent } from './components/producto-breadcrumb/producto-breadcrumb.component';
import { ProductoResolveGuard } from 'src/app/guards/producto-resolve.guard';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoCategoriaResolveGuard } from 'src/app/guards/producto-categoria-resolve.guard';
import { ProductoCategoriaIDResolveGuard } from 'src/app/guards/producto-categoria-id-resolve.guard';
import { ProductoCategoriaService } from 'src/app/services/producto-categoria.service';
import { SharedModule } from '../shared/shared.module';
import { ProductosCategoriasComponent } from './components/productos-categorias/productos-categorias.component';
import { ProductosCategoriasCreateComponent } from './components/productos-categorias-create/productos-categorias-create.component';
import { ProductosCategoriasIndexComponent } from './components/productos-categorias-index/productos-categorias-index.component';
import { UnidadMedidaComponent } from './components/unidad-medida/unidad-medida.component';
import { UnidadMedidaCreateComponent } from './components/unidad-medida-create/unidad-medida-create.component';
import { UnidadMedidaIndexComponent } from './components/unidad-medida-index/unidad-medida-index.component';
import { UnidadMedidaResolveGuard } from 'src/app/guards/unidadad-medida-resolve.guard';
import { UnidadMedidaIDResolveGuard } from 'src/app/guards/unidad-medida-id-resolve.guard';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import { FormaPresentacionComponent } from './components/forma-presentacion/forma-presentacion.component';
import { FormaPresentacionIndexComponent } from './components/forma-presentacion-index/forma-presentacion-index.component';
import { FormaPresentacionCreateComponent } from './components/forma-presentacion-create/forma-presentacion-create.component';
import { ProductoPresentacionResolveGuard } from 'src/app/guards/producto-presentacion-resolve.guard';
import { ProductoPresentacionService } from 'src/app/services/producto-presentacion.service';


@NgModule({
  declarations: [
    ProductoComponent,
    ProductoListComponent,
    ProductoCreateComponent,
    ProductoFilterComponent,
    ProductoTileComponent,
    ProductoBreadcrumbComponent,
    ProductosCategoriasComponent,
    ProductosCategoriasCreateComponent,
    ProductosCategoriasIndexComponent,
    UnidadMedidaComponent,
    UnidadMedidaCreateComponent,
    UnidadMedidaIndexComponent,
    FormaPresentacionComponent,
    FormaPresentacionIndexComponent,
    FormaPresentacionCreateComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule
  ],
  providers: [
    ProductoResolveGuard,
    ProductoPresentacionResolveGuard,
    ProductoService,
    ProductoCategoriaResolveGuard,
    ProductoCategoriaIDResolveGuard,
    ProductoCategoriaService,
    ProductoPresentacionService,
    UnidadMedidaResolveGuard,
    UnidadMedidaIDResolveGuard,
    UnidadMedidaService
  ]
})
export class ProductosModule { }
