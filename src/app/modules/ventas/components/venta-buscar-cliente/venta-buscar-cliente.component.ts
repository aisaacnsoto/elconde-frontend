import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Global } from 'src/app/utils/global';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

declare var $;
declare var toastr;

@Component({
	selector: 'app-venta-buscar-cliente',
	templateUrl: './venta-buscar-cliente.component.html',
	styleUrls: ['./venta-buscar-cliente.component.css'],
	providers: [ClienteService]
})
export class VentaBuscarClienteComponent implements OnInit {

	public cliente: Cliente;
	@Output() selectedCliente: EventEmitter<any> = new EventEmitter();
	public table: any = null;
	public tableId: string = 'dtVentaBuscarCliente';

	constructor(
		private _clienteService: ClienteService
	) { }

	ngOnInit(): void {
		this.loadTable();

		let self = this;
		
		$(`#${this.tableId} tbody`).on( 'click', 'button.btn-info', function() {
			var data: any = self.table.row( $(this).parents('tr') ).data();
			console.log(data);
			self.cliente = data;
			self.selectedCliente.emit( data );
		} );
	}

	loadTable(search: boolean = false, searchQuery: string = '') {
		if (this.table != null) {
			this.table.settings()[0].jqXHR.abort();
			// console.log('this.table.settings()', this.table.settings());
			// console.log('this.table.settings()[0]', this.table.settings()[0]);
			this.table.clear().draw();
			this.table.destroy();
		}
		if (!search) {
			this.table = $(`#${this.tableId}`).DataTable({
				ajax: {
					url: this._clienteService.url,
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
						? this._clienteService.url+'/search/query'
						: this._clienteService.url+'/search/query/'+searchQuery;

		this.table = $(`#${this.tableId}`).DataTable({
			ajax: {
				url: apiURL,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => data.nombres+' '+data.apellidos},
				{data: null, render: (data, type, full, meta) => data.tipo_doc+' '+data.num_doc},
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

}
