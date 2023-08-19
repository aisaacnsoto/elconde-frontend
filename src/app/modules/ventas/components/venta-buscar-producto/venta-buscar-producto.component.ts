import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Global } from 'src/app/utils/global';
import { Producto } from 'src/app/models/producto';

declare var $;
declare var toastr;

@Component({
	selector: 'app-venta-buscar-producto',
	templateUrl: './venta-buscar-producto.component.html',
	styleUrls: ['./venta-buscar-producto.component.css'],
	providers: [ProductoService]
})
export class VentaBuscarProductoComponent implements OnInit {

	public product: Producto = new Producto();
	public cantidad: number = 1;
	@Output() selectedProduct: EventEmitter<any> = new EventEmitter();
	public table: any = null;
	public tableId: string = 'dtBuscarProducto';

	constructor(
		private _productoService: ProductoService
	) { }

	ngOnInit(): void {
		// this.setDefaultData();
		this.loadTable();
		$('#modalProduct').on('shown.bs.modal', function (e) {
			$('#cantidadProducto').focus();
			$('#cantidadProducto').select();
		});

		let self = this;
		
		$(`#${this.tableId} tbody`).on( 'click', 'button.btn-primary', function() {
			var data: any = self.table.row( $(this).parents('tr') ).data();
			console.log(data);
			self.product = data;
			self.openModal();
		} );
	}

	loadTable(search: boolean = false, searchQuery: string = '') {
		if (this.table != null) {
			this.table.settings()[0].jqXHR.abort();
			this.table.clear().draw();
			this.table.destroy();
		}
		if (!search) {
			this.table = $(`#${this.tableId}`).DataTable({
				ajax: {
					url: this._productoService.url,
					dataSrc: ''
				},
				language: Global.dt.language,
				autoWidth: false,
				dom: 'rtp'
			});
			this.table.settings()[0].jqXHR.abort();
			this.table.clear().draw();
			return;
		}

		let apiURL = (searchQuery.length == 0)
						? this._productoService.url+'/search/venta'
						: this._productoService.url+'/search/venta/'+searchQuery;

		this.table = $(`#${this.tableId}`).DataTable({
			ajax: {
				url: apiURL,
				dataSrc: ''
			},
			columns: [
				{data: 'nombre'},
				{data: 'unidad_medida'},
				{data: 'precio'},
				{data: 'stock'},
				{defaultContent: `
					<button type="button" class="btn btn-primary">
						<i class="fas fa-plus mr-2"></i>Agregar
					</button>
				`}
			],
			createdRow: function( row, data, dataIndex ) {
				if (data.stock < 1) {
					$(row).addClass('text-danger');
				}
			},
			language: Global.dt.language,
			dom: 'rtp',
			autoWidth: false
		});
	}

	// setDefaultData(product: Producto = null) {
	// 	this.product.id            = (product != null) ? product.id            : null;
	// 	this.product.categoria     = (product != null) ? product.categoria     : -1;
	// 	this.product.nombre        = (product != null) ? product.nombre        : '';
	// 	this.product.precio        = (product != null) ? product.precio        : 0;
	// 	this.product.stock         = (product != null) ? product.stock         : 0;
	// 	this.product.activo        = (product != null) ? product.activo        : 1;
	// 	this.product.unidad_medida = (product != null) ? product.unidad_medida : '1';

	// 	this.cantidad = 1;
	// }

	// onSearchProduct(query: string, event) {
	// 	// console.log(key);
	// 	let search = query.trim();
		
	// 	if (event.keyCode == 13) {
	// 		this.onBarCodeEnter(search);
	// 		// return;
	// 	}

	// 	this.product = null;
		
	// 	if (search.length == 0) {
	// 		this.loadTable();
	// 	} else {
	// 		this.loadTable(true, search);
	// 	}

	// }

	onBarCodeEnter(query) {
		let search: string = query.trim();
		
		if (search.length > 0) {
			this.search(search);

			this.product = null;

			this.openModal();
			this._productoService.getByCodBar(search).subscribe(
				res => {
					console.log(res);
					
					if (res != null && res.length > 0) {
						this.product = <Producto>res[0];
					} else {
						toastr.warning('¡No se encontró el Producto!')
						this.openModal(false);
					}

				},
				err => {
					console.log(err);
					toastr.error('¡No se pudo encontrar el Producto!')
					this.openModal(false);
				}
			);
		}
		
	}

	private _searchTerm: string;

	get searchTerm() {
		return this._searchTerm;
	}

	set searchTerm(value: string) {
		this._searchTerm = value;
		this.search(value);
	}

	search(query: string) {
		let busqueda = query.trim();
		if (busqueda.length == 0) {
			this.loadTable();
		} else {
			this.loadTable(true, busqueda);
		}
	}

	clear() {
		this.searchTerm = '';
	}

	onArticuloSubmit() {
		// console.log(this.product);
		this.selectedProduct.emit({
			producto: this.product,
			cantidad: this.cantidad,
			precio: this.product.precio
		});
		$('#modalProduct').modal('hide');
	}

	openModal(show = true) {
		if (show) {
			$('#modalProduct').modal('show');
		} else {
			$('#modalProduct').modal('hide');
		}
	}

}
