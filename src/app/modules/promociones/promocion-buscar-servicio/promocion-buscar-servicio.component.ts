import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { Global } from 'src/app/utils/global';

declare var $: any;

@Component({
	selector: 'app-promocion-buscar-servicio',
	templateUrl: './promocion-buscar-servicio.component.html',
	styleUrls: ['./promocion-buscar-servicio.component.css'],
	providers: [ServicioService]
})
export class PromocionBuscarServicioComponent implements OnInit {

	public servicio: Servicio;
	@Output() selectedServicio: EventEmitter<any> = new EventEmitter();
	public table: any = null;
	public tableId: string = 'dtBuscarServicio';

	constructor(
		private _servicioService: ServicioService
	) { }

	ngOnInit(): void {
		this.loadTable();

		let self = this;
		
		$(`#${this.tableId} tbody`).on( 'click', 'button.btn-info', function() {
			var data: any = self.table.row( $(this).parents('tr') ).data();
			console.log(data);
			self.servicio = data;
			self.selectedServicio.emit( data );
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
					url: this._servicioService.url,
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
						? this._servicioService.url+'/search/query'
						: this._servicioService.url+'/search/query/'+searchQuery;

		this.table = $(`#${this.tableId}`).DataTable({
			searchDelay: 1000,
			ajax: {
				url: apiURL,
				dataSrc: ''
			},
			columns: [
				{ data: null, render: (data, type, full, meta) => data.nombre },
				{ defaultContent: `
					<button type="button" class="btn btn-info">
						<i class="fas fa-check mr-2"></i>Seleccionar
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

	buscarServicio(event) {
		
	}

}
