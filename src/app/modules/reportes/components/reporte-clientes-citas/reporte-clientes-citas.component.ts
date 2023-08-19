import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import * as moment from 'moment';
import { ReporteService } from 'src/app/services/reporte.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-reporte-clientes-citas',
	templateUrl: './reporte-clientes-citas.component.html',
	styleUrls: ['./reporte-clientes-citas.component.css'],
	providers: [ReporteService]
})
export class ReporteClientesCitasComponent implements OnInit {

	public data: any;
	public fechaDesde: string;
	public fechaHasta: string;
	public reloading: boolean = false;
	public cliente: Cliente = new Cliente();
	
	constructor(
		private _reporteService: ReporteService,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.fechaDesde = moment().format('YYYY-MM-DD');
		this.fechaHasta = moment().format('YYYY-MM-DD');
		this.setDefaultDataCliente();

		$('#modal-buscar-cliente').on('shown.bs.modal', function(e) {
			$('#inputSearch').focus();
			$('#inputSearch').select();
		});
	}

	setDefaultDataCliente(cliente: Cliente = null) {
		let fecha                = moment().format('YYYY-MM-DD');

		this.cliente.id          = (cliente != null) ? cliente.id          : 0;
		this.cliente.nombres     = (cliente != null) ? cliente.nombres     : '';
		this.cliente.apellidos   = (cliente != null) ? cliente.apellidos   : '';
		this.cliente.num_doc     = (cliente != null) ? cliente.num_doc     : '';
		this.cliente.tipo_doc    = (cliente != null) ? cliente.tipo_doc    : 'DNI';
		this.cliente.telefono    = (cliente != null) ? cliente.telefono    : '';
		this.cliente.fecha_nac   = (cliente != null) ? cliente.fecha_nac   : fecha;
		this.cliente.direccion   = (cliente != null) ? cliente.direccion   : '';
		this.cliente.correo      = (cliente != null) ? cliente.correo      : '';
		this.cliente.descripcion = (cliente != null) ? cliente.descripcion : '';
		this.cliente.activo      = (cliente != null) ? cliente.activo      : 1;
		this.cliente.created_at  = (cliente != null) ? cliente.created_at  : null;
		this.cliente.updated_at  = (cliente != null) ? cliente.updated_at  : null;
	}

	buscarCliente(event) {
		this.setDefaultDataCliente(event);
		$('#modal-buscar-cliente').modal('hide');
		// console.log('resultado',this.cita.cliente);
	}

	fetchData() {

		if ( this.cliente.id < 1 ) {
			toastr.error('¡Por favor, seleccione un Cliente!');
			return;
		}

		let id = 'btnConsultar';
		this.reloading = true;
		this.data = null;

		this.showProcessingIndicator(id);

		this._reporteService.citasAtendidas(this.cliente.id, this.fechaDesde, this.fechaHasta).subscribe(
			res => {
				this.reloading = false;
				console.log(res);
				this.data = res;
				this.showProcessingIndicator(id, false);
			},
			err => {
				this.reloading = false;
				console.log(err);
				this.data = [];
				this.showProcessingIndicator(id, false);
			}
		);
	}

	imprimir() {
		$('#seccion-imprimir').printThis({
			importCSS: true,
			importStyle: true,
			loadCSS: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
		});
	}

	showProcessingIndicator(id: string, processing: boolean = true) {
		let defaultTemplate = `
			<i class="fas fa-search mr-1"></i>
			Consultar
		`;
		
		let loadingTemplate = `
			<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
			Consultando
		`;

		if (processing) {
			this.setButtonTemplate(id, loadingTemplate, true);
		} else {
			this.setButtonTemplate(id, defaultTemplate, false);
		}
	}

	setButtonTemplate(id: string, template: string, disabled: boolean) {
		let buttonRegister = <HTMLButtonElement>document.getElementById(id);
		buttonRegister.innerHTML = template;
		buttonRegister.disabled = disabled;
	}

}
