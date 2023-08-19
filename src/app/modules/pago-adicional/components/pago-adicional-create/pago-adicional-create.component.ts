import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { PagoAdicional } from 'src/app/models/pago-adicional';
import { PagoAdicionalService } from 'src/app/services/pago-adicional.service';
import { PagoAdicionalTipo } from 'src/app/models/pago-adicional-tipo';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-pago-adicional-create',
	templateUrl: './pago-adicional-create.component.html',
	styleUrls: ['./pago-adicional-create.component.css']
})
export class PagoAdicionalCreateComponent implements OnInit {

	pago: PagoAdicional;
	tipos: PagoAdicionalTipo[] = [];
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _pagoService: PagoAdicionalService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;
		this.pago = new PagoAdicional();

		this._route.data.subscribe(data => {

			if (data['pago'] != undefined) {
				this.setDefaultData(data['pago']);
			} else {
				this.setDefaultData();
			}

			this.tipos = data['tipos'];
		});
		
	}

	setDefaultData(pago: PagoAdicional = null) {

		this.pago.id         = (pago != null) ? pago.id         : null;
		this.pago.tipo       = (pago != null) ? pago.tipo.id    : '-1';
		this.pago.fecha      = (pago != null) ? pago.fecha      : moment().format('YYYY-MM-DD');
		this.pago.monto      = (pago != null) ? pago.monto      : 0;
		this.pago.created_at = (pago != null) ? pago.created_at : null;
		this.pago.updated_at = (pago != null) ? pago.updated_at : null;
		this.edit            = (pago != null) ? true            : false;
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
		this._router.navigate(['/pago-adicional']);
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
