import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import * as moment from 'moment';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-cliente-create',
	templateUrl: './cliente-create.component.html',
	styleUrls: ['./cliente-create.component.css'],
	providers: [ClienteService]
})
export class ClienteCreateComponent implements OnInit {

	cliente: Cliente = {
		id: null,
		nombres: '',
		apellidos: '',
		num_doc: '',
		tipo_doc: 'DNI',
		telefono: '',
		fecha_nac: moment().format('YYYY-MM-DD'),
		direccion: '',
		correo: '',
		descripcion: '',
		activo: 1,
		created_at: null,
		updated_at: null
	};
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _clienteService: ClienteService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;
		this.initCheckEvents();

		this._route.data.subscribe(data => {

			if (data['cliente'] != undefined) {
				this.edit = true;
				this.cliente = data['cliente'];
			}
		});
		
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._clienteService.update(this.cliente).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._clienteService.save(this.cliente).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	initCheckEvents() {
		$('#radioRecomendacion').click(() => {
			$('#inputDescripcion').attr('readonly', true);
			this.cliente.descripcion = 'RECOMENDACION DE TERCEROS';
		});
		$('#radioAnuncio').click(() => {
			$('#inputDescripcion').attr('readonly', true);
			this.cliente.descripcion = 'ANUNCIO EN REDES U OTROS MEDIOS';
		});
		$('#radioOtro').click(() => {
			$('#inputDescripcion').attr('readonly', false);
			this.cliente.descripcion = '';
			$('#inputDescripcion').focus();
		});
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/clientes']);
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
