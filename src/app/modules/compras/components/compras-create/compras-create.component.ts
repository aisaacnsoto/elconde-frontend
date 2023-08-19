import { Component, OnInit, ViewChild } from '@angular/core';
import { Compra } from 'src/app/models/compra';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { CompraService } from 'src/app/services/compra.service';
import * as moment from 'moment';
import { Proveedor } from 'src/app/models/proveedor';
import { BuscarProveedorComponent } from '../buscar-proveedor/buscar-proveedor.component';
import { ActivatedRoute } from '@angular/router';
import { CompraBuscarProductoComponent } from '../compra-buscar-producto/compra-buscar-producto.component';

declare var $;
declare var toastr;

@Component({
	selector: 'app-compras-create',
	templateUrl: './compras-create.component.html',
	styleUrls: ['./compras-create.component.css'],
	providers: [ProductoService, CompraService]
})
export class ComprasCreateComponent implements OnInit {

	public compra: Compra;
	public productos: Array<Producto>;
	public selectedProducto: Producto;
	public selectedProveedor: Proveedor;

	@ViewChild('buscarProveedorComponent')
	public proveedorComp: BuscarProveedorComponent;

	@ViewChild(CompraBuscarProductoComponent)
	public productoComp: CompraBuscarProductoComponent;
	public dtBuscarProducto: string = 'dtBuscarProductoCompra';

	public edit: boolean = false;

	constructor(
		// private _productoService: ProductoService,
		private _compraService: CompraService,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this._route.data.subscribe(data => {
			if (data['compra'] != undefined) {
				this.compra = data['compra'];
				this.compra.changes = {
					to_insert: [],
					to_delete: [],
					to_update: []
				}
				this.selectedProveedor = this.compra.get_proveedor;
				this.edit = true;
			} else {
				this.compra = new Compra();
				this.selectedProveedor = new Proveedor();
				this.initModel();
			}
		});
		// this.getProductos();
	}

	initModel() {
		let fecha = moment().format('YYYY-MM-DD');
		let hora = moment().format('HH:mm:ss')
		this.compra.id = null;
		this.compra.fecha_emi = fecha;
		this.compra.fecha_inter = fecha;
		this.compra.hora_inter = hora;
		this.compra.proveedor = null;
		this.compra.tipo_doc = 'GUIA DE REMISION';
		this.compra.nro_doc_pref = '';
		this.compra.nro_doc_suf = '';
		this.compra.total = 0;
		this.compra.detalle = [];

		this.selectedProveedor.id = null;
		this.selectedProveedor.nombre = '';
	}

	onSubmit() {
		let errores = 0;
		
		if (this.compra.proveedor == null) {
			toastr.error('¡Seleccione un Proveedor!');
			errores++;
		}
		if (this.compra.detalle.length == 0) {
			toastr.error('¡Agrega algún item!');
			errores++;
		}
		if (errores > 0) return;

		this.loader(true);

		if (this.edit) {
			this._compraService.update(this.compra).subscribe(
				res => {
					console.log(res);
					toastr.success('¡Actualizado correctamente!');
					this.loader(false);
					this.initModel();
					this.productoComp.clear();
				},
				err => {
					console.log(err);
					toastr.error('¡No se pudo actualizar!');
					this.loader(false);
				}
			);
		} else {
			this._compraService.save(this.compra).subscribe(
				res => {
					console.log(res);
					toastr.success('¡Registrado correctamente!');
					this.loader(false);
					this.initModel();
					this.productoComp.clear();
				},
				err => {
					console.log(err);
					toastr.error('¡No se pudo registrar!');
					this.loader(false);
				}
			);
		}
	}

	onProductoSubmit(event) {
		// console.log(this.compra.detalle);
		// let selectedItem = $('#productos').select2('data');
		let selectedItemId = +event.producto.id;

		let cantidad = event.cantidad;
		let precio = event.precio;
		
		let errores = 0;
		
		if (selectedItemId <= 0) {
			toastr.error('¡Seleccione un Producto!');
			errores++;
		}
		if (this.compra.detalle.find(item => item.producto == selectedItemId) != null) {
			toastr.warning('¡El producto ya está agregado!');
			errores++;
		}
		if (cantidad == '' || isNaN(cantidad)) {
			toastr.error('¡Ingrese la cantidad!');
			errores++;
		}
		if (precio == '' || isNaN(precio)) {
			toastr.error('¡Ingrese el precio!');
			errores++;
		}
		if (errores > 0) return;
		
		let importe = +cantidad * +precio;
		this.selectedProducto = event.producto;
		
		let tmp = {
			cantidad: cantidad,
			get_producto: {
				producto: {
					id: this.selectedProducto.id,
					nombre: this.selectedProducto.nombre
				},
				unidad_medida: {
					unidad: this.selectedProducto.unidad_medida
				}
			},
			producto: selectedItemId,
			precio: precio,
			importe: importe
		};
		this.compra.detalle.push(tmp);

		if (this.edit) {
			this.compra.changes.to_insert.push(tmp);
		}
		// console.log()
		this.calcularTotal();

	}

	removeItem(index) {
		let deleted = this.compra.detalle.splice(index, 1);
		deleted = deleted[0];
		if (this.edit) {
			if (deleted['id'] != undefined) {
				this.compra.changes.to_delete.push(deleted);
			}

			let indexInsert = this.compra.changes.to_insert.indexOf(deleted);
			if (indexInsert > -1) {
				this.compra.changes.to_insert.splice(indexInsert, 1);
			}

			let indexUpdate = this.compra.changes.to_update.indexOf(deleted);
			if (indexUpdate > -1) {
				this.compra.changes.to_update.splice(indexUpdate, 1);
			}
		}
		this.calcularTotal();
	}

	calcularTotal() {
		let total = 0;

		this.compra.detalle.forEach(item => {
			total += +item.importe;
		});

		this.compra.total = total;
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

	buscarProveedor() {
		this.proveedorComp.openModal();
	}

	onSelectProveedor(event) {
		this.selectedProveedor = event;
		console.log('proveedor', event);
		this.compra.proveedor = this.selectedProveedor.id;
	}
}
