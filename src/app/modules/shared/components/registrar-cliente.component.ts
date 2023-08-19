import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import * as moment from 'moment';
import { Global } from 'src/app/utils/global';

declare var $;
declare var toastr;

@Component({
	selector: 'app-registrar-cliente',
	templateUrl: './registrar-cliente.component.html',
	styleUrls: ['./registrar-cliente.component.css'],
	providers: [ClienteService]
})
export class RegistrarClienteComponent implements OnInit {

	public recommendationChecked: boolean = false;
    public cliente: Cliente;
	@Output('success') public event: EventEmitter<Cliente> = new EventEmitter();
	// public recomendador = { id: -1, nombre: '' };
	public recomendadorId = null;
	public recomendadorNombre = '';
	public table: any = null;
	public tableId: string = 'dtBuscarRecomendador';

	constructor(
		private _clienteService: ClienteService
	) {
		this.cliente = new Cliente();
	}

	ngOnInit(): void {
		this.initModalEvents();
		this.setDefaultData();
		this.setDefaultRecomendador();
		this.loadTable();

		let self = this;

		$(`#${this.tableId} tbody`).on( 'click', 'button.btn-info', function() {
			var data: any = self.table.row( $(this).parents('tr') ).data();
			self.setDefaultRecomendador({
				id: data.id,
				nombre: data.nombres
			});
		} );
	}

	setDefaultRecomendador(data?: any) {
		if (data != null) {
			this.recomendadorId = data.id;
			this.recomendadorNombre = data.nombre;
		} else {
			this.recomendadorId = null;
			this.recomendadorNombre = '';
		}
	}

	initModalEvents() {
		$('#radioRecomendacion').click(() => {
			$('#inputDescripcion').attr('readonly', true);
			this.clearSearch();
			this.recommendationChecked = true;
			this.cliente.descripcion = 'RECOMENDACION DE TERCEROS';
			$('#inputSearchRecom').focus();
		});
		$('#radioAnuncio').click(() => {
			$('#inputDescripcion').attr('readonly', true);
			this.recommendationChecked = false;
			this.cliente.descripcion = 'ANUNCIO EN REDES U OTROS MEDIOS';
		});
		$('#radioOtro').click(() => {
			$('#inputDescripcion').attr('readonly', false);
			this.recommendationChecked = false;
			this.cliente.descripcion = '';
			$('#inputDescripcion').focus();
		});
		$('#modal-cliente').on('shown.bs.modal', function(e) {
			$('#nombres').focus();
		});
	}

	setDefaultData() {
		let fecha = moment().format('YYYY-MM-DD');
		this.cliente.id = 0;
		this.cliente.nombres = '';
		this.cliente.apellidos = '';
		this.cliente.num_doc = '';
		this.cliente.tipo_doc = 'DNI';
		this.cliente.telefono = '';
		this.cliente.fecha_nac = fecha;
		this.cliente.direccion = '';
		this.cliente.correo = '';
		this.cliente.descripcion = '';
		this.cliente.activo = 1;
		this.cliente.created_at = null;
		this.cliente.updated_at = null;

		this.cliente.recomendador = {
			id: -1,
			nombre: ''
		};
	}

	openModalCliente() { $('#modal-cliente').modal('show'); }

	closeModalCliente() { $('#modal-cliente').modal('hide'); }

	onClienteFormSubmit() {
		this.cliente.recomendador = this.recomendadorId;
        this.showProcessingIndicator();
        
		this._clienteService.save(this.cliente).subscribe(
			res => {
				this.showProcessingIndicator(false);

				if (res.mensaje != undefined) {

					toastr.error(res.mensaje);
				} else {

					this.event.emit(res);
					this.closeModalCliente();
					toastr.success('¡Cliente registrado correctamente!');
					this.setDefaultData();
					this.setDefaultRecomendador();
					this.recommendationChecked = false;
				}
			},
			err => {
				console.log(err);
				this.showProcessingIndicator(false);
				toastr.error('¡No se pudo registrar el cliente!');
			}
		);
    }
    
    
	showProcessingIndicator(processing: boolean = true) {
		let defaultTemplate = `
			<i class="fas fa-check mr-1"></i>
			Guardar
		`;
		let loadingTemplate = `
			<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
			Guardando
		`;
		if (processing) {
			this.setButtonTemplate(loadingTemplate, true);
		} else {
			this.setButtonTemplate(defaultTemplate, false);
		}
	}

	setButtonTemplate(template: string, disabled: boolean) {
		let buttonRegister = <HTMLButtonElement>document.getElementById('buttonRegisterCliente');
		buttonRegister.innerHTML = template;
		buttonRegister.disabled = disabled;
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
				{ data: null, render: (data, type, full, meta) => this.formatRow(data) },
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

	formatRow(data: any) {
		let html = '';
		// html += '';
		// html += '<span class="text-warning mr-1"><i class="fas fa-crown"></i></span>';
		html += data.nombres+' '+data.apellidos
		// html += '<span class="text-primary ml-1"><i class="fas fa-user"></i></span>';
		// html += '<span class="text-primary ml-1"><i class="fas fa-user"></i></span>';
		// html += '<span class="text-primary ml-1"><i class="fas fa-user"></i></span>';
		// html += '<span class="text-primary ml-1"><i class="fas fa-user"></i></span>';
		// html += '<span class="text-primary ml-1"><i class="fas fa-user"></i></span>';
		return html;
	}

}
