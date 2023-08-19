import { Component, OnInit } from '@angular/core';
import { ClienteVIP } from 'src/app/models/cliente-vip';
import { ClienteVIPService } from 'src/app/services/cliente-vip.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-cliente-vip-codigos-register',
	templateUrl: './cliente-vip-codigos-register.component.html',
	styleUrls: ['./cliente-vip-codigos-register.component.css'],
	providers: [ClienteVIPService]
})
export class ClienteVipCodigosRegisterComponent implements OnInit {

	clienteVIP: ClienteVIP = {
		id: null,
		codigo: '',
		cliente: {
			id: null,
			nombres: '',
			apellidos: ''
		},
		fecha_desde: moment().format('YYYY-MM-DD'),
		fecha_hasta: moment().format('YYYY-MM-DD'),
		activo: 1,
		created_at: null,
		updated_at: null
	};
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _clienteVIPService: ClienteVIPService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;

		this._route.data.subscribe(data => {

			if (data['clienteVIP'] != undefined) {
				this.edit = true;
				this.clienteVIP = data['clienteVIP'];
			}
		});

		$('#modal-buscar-cliente').on('shown.bs.modal', function(e) {
			$('#inputSearch').focus();
			$('#inputSearch').select();
		});
		
	}

	buscarCliente(event) {
		this.clienteVIP.cliente.id = event.id;
		this.clienteVIP.cliente.nombres = event.nombres;
		this.clienteVIP.cliente.apellidos = event.apellidos;
		$('#modal-buscar-cliente').modal('hide');
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._clienteVIPService.update(this.clienteVIP).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._clienteVIPService.save(this.clienteVIP).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/promociones/clientes-vip/codigos']);
	}

	onError(alertMessage: string, err: any) {
		console.log(err);
		this.showProcessingIndicator(false);
		toastr.error(alertMessage);
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
		let buttonRegister = <HTMLButtonElement>document.getElementById('buttonRegister');
		buttonRegister.innerHTML = template;
		buttonRegister.disabled = disabled;
	}
}
