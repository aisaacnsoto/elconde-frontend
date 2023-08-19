import { Component, OnInit, ViewChild } from '@angular/core';
import { Inventario } from 'src/app/models/inventario';
import { Producto } from 'src/app/models/producto';
import { InventarioService } from 'src/app/services/inventario.service';
import { InventariosBuscarProductoComponent } from '../inventarios-buscar-producto/inventarios-buscar-producto.component';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

declare var $;
declare var toastr;

@Component({
	selector: 'app-inventarios-create',
	templateUrl: './inventarios-create.component.html',
	styleUrls: ['./inventarios-create.component.css'],
	providers: [InventarioService]
})
export class InventariosCreateComponent implements OnInit {

	public inventario: Inventario;
	public selectedProducto: Producto;

	public addProducto: number;
	public addStock: number;
	public edit: boolean = false;

	@ViewChild(InventariosBuscarProductoComponent)
	public buscarComponent: InventariosBuscarProductoComponent;

	constructor(
		private _inventarioService: InventarioService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit(): void {
		
		this._route.data.subscribe(data => {
			if (data['inventario'] != undefined) {
				this.addProducto = 0;
				this.addStock = 1;
				this.edit = true;
				
				this.inventario = data['inventario'];
				this.inventario.changes = {
					to_insert: [],
					to_delete: [],
					to_update: []
				}; 
				this.inventario.detalle_old = this.inventario.detalle;
			} else {
				this.inventario = new Inventario();
				this.initModel();
			}
		});
	}

	initModel() {
		let fecha = moment().format('YYYY-MM-DD');
		let hora = moment().format('HH:mm:ss')
		this.inventario.id = null;
		this.inventario.fecha = fecha;
		this.inventario.hora = hora;
		this.inventario.comentario = '';
		this.inventario.created_at = null;
		this.inventario.updated_at = null;
		this.addProducto = 0;
		this.addStock = 1;

		this.inventario.detalle = [];
		this.inventario.detalle_old = [];
	}

	onSubmit() {
		if (this.inventario.detalle.length == 0) {
			toastr.warning('¡Agrega algún item!');
			return;
		}

		this.loader(true);

		if (this.edit) {

			this._inventarioService.update(this.inventario).subscribe(
				res => {
					toastr.success('¡Actualizado correctamente!');
					this.loader(false);
					this.initModel();
					this.buscarComponent.clearSearch();
					this._router.navigate(['/inventarios']);
				},
				err => {
					toastr.error('¡No se pudo actualizar!');
					this.loader(false);
				}
			);

		} else {
			
			this._inventarioService.save(this.inventario).subscribe(
				res => {
					toastr.success('¡Registrado correctamente!');
					this.loader(false);
					this.initModel();
					this.buscarComponent.clearSearch();
				},
				err => {
					toastr.error('¡No se pudo registrar!');
					this.loader(false);
				}
			);
			
		}
	}

	onProductoSubmit(event) {
		let producto = (event != null) ? event.producto : this.selectedProducto;
		let cantidad = (event != null) ? event.producto.stock : 1;

		if (this.inventario.detalle.find(item => item.producto == producto.id) != null) {
			toastr.warning('¡El producto ya está agregado!');
			return;
		}

		let tmp = {
			stock: cantidad,
			producto: producto.id,
			get_producto: {
				producto: {
					nombre: producto.nombre
				},
				unidad_medida: {
					unidad: producto.unidad_medida
				}
			}
		};
		this.inventario.detalle.push(tmp);

		if (this.edit) {
			this.inventario.changes.to_insert.push(tmp);
		}
	}

	removeItem(index) {
		let deleted = this.inventario.detalle.splice(index, 1);
		deleted = deleted[0];
		if (this.edit) {
			if (deleted['id'] != undefined) {
				this.inventario.changes.to_delete.push(deleted);
			}
			
			let indexInsert = this.inventario.changes.to_insert.indexOf(deleted);
			if (indexInsert > -1) {
				this.inventario.changes.to_insert.splice(indexInsert, 1);
			}

			let indexUpdate = this.inventario.changes.to_update.indexOf(deleted);
			if (indexUpdate > -1) {
				this.inventario.changes.to_update.splice(indexUpdate, 1);
			}
		}
	}

	loader(showing = true) {
		let spinner = $('#spinnerRegister');
		let button = $('#buttonRegister');

		if (showing) {
			spinner.show();
			button.attr('disabled', true).attr('cursor', 'pointer');
		} else {
			spinner.hide();
			button.attr('disabled', false).attr('cursor', 'default');
		}
	}

	stockChange(index) {
		if (this.edit) {
			let changed = this.inventario.detalle[index];
			if (this.inventario.changes.to_update.indexOf(changed) == -1) {
				this.inventario.changes.to_update.push(changed);
			}

			let indexInsert = this.inventario.changes.to_insert.indexOf(changed);
			if (indexInsert > -1) {
				this.inventario.changes.to_insert.splice(indexInsert, 1);
			}
		}
	}

}
