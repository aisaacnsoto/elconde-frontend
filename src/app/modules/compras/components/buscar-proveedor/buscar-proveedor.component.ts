import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Global } from 'src/app/utils/global';

declare var $;

@Component({
	selector: 'app-buscar-proveedor',
	templateUrl: './buscar-proveedor.component.html',
	styleUrls: ['./buscar-proveedor.component.css'],
	providers: [ProveedorService]
})
export class BuscarProveedorComponent implements OnInit {

	public proveedor: Proveedor;
	@Output() selectedItem: EventEmitter<any> = new EventEmitter();
	public table: any = null;
	public tableId: string = 'tableSearchProveedor';

	constructor(
		private _proveedorService: ProveedorService
	) { }

	ngOnInit(): void {
		this.loadTable();

		$('#modal-buscar-proveedor').on('shown.bs.modal', function(e) {
			$('#inputSearchProveedor').focus();
		});

		let self = this;
		
		$(`#${this.tableId} tbody`).on( 'click', 'button.btn-info', function() {
			var data: any = self.table.row( $(this).parents('tr') ).data();
			self.proveedor = data;
			// console.log('buscar proveedor', data);
			self.closeModal();
			self.selectedItem.emit( data );
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
					url: this._proveedorService.url,
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
						? this._proveedorService.url+'/search/query'
						: this._proveedorService.url+'/search/query/'+searchQuery;

		this.table = $(`#${this.tableId}`).DataTable({
			ajax: {
				url: apiURL,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => data.nombre},
				{data: null, render: (data, type, full, meta) => data.ruc},
				{defaultContent: `
					<button type="button" class="btn btn-info">
						<i class="fas fa-check mr-2"></i>Seleccionar
					</button>
				`}
			],
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

	clearSearch() {
		this.searchTerm = '';
	}

	openModal() {
		$('#modal-buscar-proveedor').modal('show');
	}

	closeModal() {
		$('#modal-buscar-proveedor').modal('hide');
	}

}
