import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Global } from 'src/app/utils/global';
import { Producto } from 'src/app/models/producto';

declare var $;

@Component({
	selector: 'app-asignacion-buscar-producto',
	templateUrl: './asignacion-buscar-producto.component.html',
	styleUrls: ['./asignacion-buscar-producto.component.css'],
	providers: [ProductoService]
})
export class AsignacionBuscarProductoComponent implements OnInit {

	public product: Producto = new Producto();
	@Output() selectedProduct: EventEmitter<any> = new EventEmitter();
	public table: any = null;
	public tableId: string = 'dtBuscarProductoAsignacion';

	constructor(
		private _productoService: ProductoService
	) { }

	ngOnInit(): void {
		this.loadTable();

		let self = this;
		
		$(`#${this.tableId} tbody`).on( 'click', 'button.btn-info', function() {
			var data: any = self.table.row( $(this).parents('tr') ).data();
			self.product = data;
			self.onArticuloSubmit();
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
						? this._productoService.url+'/search/asignacion'
						: this._productoService.url+'/search/asignacion/'+searchQuery;

		this.table = $(`#${this.tableId}`).DataTable({
			ajax: {
				url: apiURL,
				dataSrc: ''
			},
			columns: [
				{data: 'nombre'},
				{data: 'unidad_medida'},
				{data: 'stock'},
				{defaultContent: `
					<button type="button" class="btn btn-info">
						<i class="fas fa-check mr-1"></i>Seleccionar
					</button>
				`}
			],
			createdRow: function( row, data ) {
				if (data.stock < 1) {
					$(row).addClass('text-danger');
				}
			},
			language: Global.dt.language,
			dom: 'rtp',
			autoWidth: false
		});
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
		this.selectedProduct.emit({
			producto: this.product
		});
	}

}
