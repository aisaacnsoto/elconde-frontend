import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Global } from 'src/app/utils/global';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

declare var $;
declare var toastr;

@Component({
	selector: 'app-cita-buscar-cliente',
	templateUrl: './cita-buscar-cliente.component.html',
	styleUrls: ['./cita-buscar-cliente.component.css'],
	providers: [ClienteService]
})
export class CitaBuscarClienteComponent implements OnInit {

	public cliente: Cliente;
	@Output() selectedCliente: EventEmitter<any> = new EventEmitter();
	public table: any = null;
	public tableId: string = 'dtCitaBuscarCliente';

	constructor(
		private _clienteService: ClienteService
	) { }

	ngOnInit(): void {
		$('[data-toggle="tooltip"]').tooltip();
		this.loadTable();

		let self = this;
		
		$(`#${this.tableId} tbody`).on( 'click', 'button.btn-info', function() {
			var data: any = self.table.row( $(this).parents('tr') ).data();
			self.cliente = data;
			self.selectedCliente.emit( data );
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
				searchDelay: 1000,
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
			searchDelay: 1000,
			ajax: {
				url: apiURL,
				dataSrc: ''
			},
			columns: [
				{ data: null, render: (data, type, full, meta) => this.formatName(data) },
				{ data: null, render: (data, type, full, meta) => data.tipo_doc+' '+data.num_doc },
				{ data: null, render: (data, type, full, meta) => this.formatVisitas(data) },
				{ data: null, render: (data, type, full, meta) => this.formatRecomendados(data) },
				{ defaultContent: `
					<button type="button" class="btn btn-info" title="Seleccionar">
						<i class="fas fa-check"></i>
					</button>
				` }
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

	formatName(data: any) {
		let html = '';
		if (data.vip == true) {
			html += '<span class="text-warning mr-1" data-toggle="tooltip" data-placement="top" title="Cliente VIP"><i class="fas fa-crown"></i></span>';
		}
		if (data.trabajador == true) {
			html += '<span class="text-orange mr-1" data-toggle="tooltip" data-placement="top" title="Trabajador"><i class="fas fa-briefcase"></i></span>';
		}
		if (data.cumpleanios == true) {
			html += '<span class="text-pink mr-1" data-toggle="tooltip" data-placement="top" title="'+data.cumple_message+'"><i class="fas fa-birthday-cake"></i></span>';
		}
		html += data.nombres+' '+data.apellidos;
		return html;
	}

	formatVisitas(data: any) {
		let html = '';
		html += data.visitas;
		return html;
	}

	formatRecomendados(data: any) {
		let html = '';
		for (let index = 0; index < data.clientes_recomendados.length; index++) {
			let cliente = data.clientes_recomendados[index];
			html += '<span class="text-primary mr-1" data-toggle="tooltip" data-placement="top" title="'+cliente.recomendado+'"><i class="fas fa-user"></i></span>';
		}
		html += data.recomendados;
		return html;
	}

}
