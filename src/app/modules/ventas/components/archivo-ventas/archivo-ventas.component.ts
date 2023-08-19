import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Global } from 'src/app/utils/global';
import { Usuario } from 'src/app/models/usuario';

import * as moment from 'moment';

declare var $;
declare var toastr;

@Component({
	selector: 'app-archivo-ventas',
	templateUrl: './archivo-ventas.component.html',
	styleUrls: ['./archivo-ventas.component.css'],
	providers: [VentaService, CurrencyPipe, UsuarioService]
})
export class ArchivoVentasComponent implements OnInit {

	public venta: any;
	public currentUser: Usuario;
	public dateFrom;
	public dateTo;
	public cajeros;
	public selectedCajero;

	public ticket: any;
	public return_to: string;

	public defaultActionsTemplate = `
		<div class="btn-group" role="group">
			<button type="button" class="btn btn-warning">
				<i class="fas fa-search mr-1"></i>
			</button>
			<button type="button" class="btn btn-info" disabled>
				<i class="fas fa-edit mr-1"></i>
			</button>
			<button type="button" class="btn btn-danger" disabled>
				<i class="fas fa-trash-alt mr-1"></i>
			</button>
		</div>
	`;
	public adminActionsTemplate = `
		<div class="btn-group" role="group">
			<button type="button" class="btn btn-warning">
				<i class="fas fa-search mr-1"></i>
			</button>
			<button type="button" class="btn btn-info">
				<i class="fas fa-edit mr-1"></i>
			</button>
			<button type="button" class="btn btn-danger">
				<i class="fas fa-trash-alt mr-1"></i>
			</button>
		</div>
	`;

	constructor(
		private _router: Router,
		private _ventasService: VentaService,
		private _currencyPipe: CurrencyPipe,
		private activatedRoute: ActivatedRoute,
		private _usuarioService: UsuarioService,
	) { }

	ngOnInit(): void {
		this.currentUser    = <Usuario>this._usuarioService.getStorage();
		let dateNow         = moment().format('YYYY-MM-DD');
		this.dateFrom       = dateNow;
		this.dateTo         = dateNow;
		this.ticket         = {};
		this.selectedCajero = 0;

		// Obtener parametro de la url
		this.activatedRoute.queryParams.subscribe( params => {
			this.return_to = ( params['return_to'] != undefined ) ? params['return_to'] : 'ventas';
		} );
		// Obtener los cajeros
		this.activatedRoute.data.subscribe( data => {
			this.cajeros = data['cajeros']
		} );

		this.fetchData();
	}

	onChangeDate() { this.fetchData(); }

	loadDataTable(init: boolean, ajaxUrl: string) {
		let element = $('#dtArchivoVentas');
		element.DataTable().destroy();

		if (init) {
			let dataTable = element.DataTable({
				language: Global.dt.language
			});
			dataTable.clear().draw();
			return;
		}

		let dataTable = element.DataTable({
			ajax: {
				url: ajaxUrl,
				dataSrc: ''
			},
			columns: [
				{
					data: null,
					render: (data, type, full, meta) => meta.row + 1
				},
				{
					data: null,
					render: (data, type, full, meta) => {
						return data.get_usuario != null
									? data.get_usuario.nombre_display
									: '';
					}
				},
				{
					data: null,
					render: (data, type, full, meta) => moment(data.fecha).format('DD/MM/YYYY')
				},
				{ data: 'hora' },
				{ data: 'tipo_venta' },
				{
					data: null,
					render: (data, type, full, meta) => {
						return data.get_cliente != null
									? data.get_cliente.nombres+' '+data.get_cliente.apellidos
									: 'VENTAS DEL DÍA';
					}
				},
				{
					data: null,
					render: (data, type, full, meta) => this._currencyPipe.transform(data.total, 'S/ ')
				},
				{
					defaultContent: (this.currentUser.rol == 1)
									? this.adminActionsTemplate
									: this.defaultActionsTemplate
				},
			],
			language: Global.dt.language,
			autoWidth: true,
		});

		let self = this;

		$('#dtArchivoVentas tbody').unbind('click');

		$('#dtArchivoVentas tbody').on( 'click', 'button.btn-warning', function() {
			var data: any = dataTable.row( $(this).parents('tr') ).data();
			self.imprimirTicket(data);
		} );

		$('#dtArchivoVentas tbody').on( 'click', 'button.btn-info', function() {
			var data: any = dataTable.row( $(this).parents('tr') ).data();
			self._router.navigate(['/ventas/editar/'+data.id]);
		} );

		$('#dtArchivoVentas tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = dataTable.row( $(this).parents('tr') ).data();
			self.venta = data;
			$('#modal-delete').modal('show');
		} );

		return dataTable;
	}

	fetchData() {
		let ajaxUrl = `${this._ventasService.url}/archivo/${this.dateFrom}/${this.dateTo}`;

		if (this.selectedCajero > 0) ajaxUrl += `/${this.selectedCajero}`;

		return this.loadDataTable(false, ajaxUrl);
	}

	imprimirTicket(res = null) {
		
		if (res != null) this.ticket = res;

		$('#ticketVenta').printThis({
			importCSS: true,
			importStyle: true,
			loadCSS: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
		});
	}

	
	onDelete() {
		this.showProcessingIndicator();
		this._ventasService.delete(this.venta).subscribe(
			res => {
				this.fetchData();
				toastr.success('¡Eliminado correctamente!');
				this.showProcessingIndicator(false);
				$('#modal-delete').modal('hide');
			},
			err => {
				console.log(err);
				toastr.error('¡No se pudo eliminar!');
				this.showProcessingIndicator(false);
				$('#modal-delete').modal('hide');
			}
		);
	}

	showProcessingIndicator(processing: boolean = true) {
		let buttonRegister = <HTMLButtonElement>document.getElementById('buttonDelete');
		if (processing) {
			buttonRegister.innerHTML = `
				<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
				Eliminando
			`;
			buttonRegister.disabled = true;
		} else {
			buttonRegister.innerHTML = `
				<i class="fas fa-ban mr-1"></i>
				Eliminar
			`;
			buttonRegister.disabled = false;
		}
	}

}
