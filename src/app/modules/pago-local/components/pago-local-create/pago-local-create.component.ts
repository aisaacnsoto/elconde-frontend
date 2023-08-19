import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { PagoLocal } from 'src/app/models/pago-local';
import { PagoLocalService } from 'src/app/services/pago-local.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-pago-local-create',
	templateUrl: './pago-local-create.component.html',
	styleUrls: ['./pago-local-create.component.css']
})
export class PagoLocalCreateComponent implements OnInit {

	pago: PagoLocal;
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _pagoService: PagoLocalService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;
		this.pago = new PagoLocal();

		this._route.data.subscribe(data => {

			if (data.pago != undefined) {
				this.setDefaultData(data.pago);
			} else {
				this.setDefaultData();
			}
		});
		
	}

	setDefaultData(pago: PagoLocal = null) {

		this.pago.id                    = (pago != null) ? pago.id                    : null;
		this.pago.fecha                = (pago != null) ? pago.fecha                : moment().format('YYYY-MM-DD');
		this.pago.monto                  = (pago != null) ? pago.monto                  : 0;
		this.pago.created_at            = (pago != null) ? pago.created_at            : null;
		this.pago.updated_at            = (pago != null) ? pago.updated_at            : null;
		this.edit                              = (pago != null) ? true                              : false;
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._pagoService.update(this.pago).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._pagoService.save(this.pago).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/pago-local']);
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
