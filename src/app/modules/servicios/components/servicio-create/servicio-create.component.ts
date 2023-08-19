import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicio } from 'src/app/models/servicio';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-servicio-create',
	templateUrl: './servicio-create.component.html',
	styleUrls: ['./servicio-create.component.css'],
	providers: [ServicioService]
})
export class ServicioCreateComponent implements OnInit {

	servicio: Servicio = {
		id: null,
		codigo: '',
		nombre: '',
		precio: 0,
		tiempo_promedio: 0,
		pago_comision: 0,
		activo: 1,
		created_at: null,
		updated_at: null,
	};
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _servicioService: ServicioService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;

		this._route.data.subscribe(data => {

			if (data['servicio'] != undefined) {
				this.edit = true;
				this.servicio = data['servicio'];
			}
		});
		
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._servicioService.update(this.servicio).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._servicioService.save(this.servicio).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/servicios']);
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
