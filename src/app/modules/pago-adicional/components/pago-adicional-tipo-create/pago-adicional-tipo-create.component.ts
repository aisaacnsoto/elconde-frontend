import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagoAdicionalTipo } from 'src/app/models/pago-adicional-tipo';
import { PagoAdicionalTipoService } from 'src/app/services/pago-adicional-tipo.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-pago-adicional-tipo-create',
	templateUrl: './pago-adicional-tipo-create.component.html',
	styleUrls: ['./pago-adicional-tipo-create.component.css']
})
export class PagoAdicionalTipoCreateComponent implements OnInit {

	tipo: PagoAdicionalTipo;
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _tipoService: PagoAdicionalTipoService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;
		this.tipo = new PagoAdicionalTipo();

		this._route.data.subscribe(data => {

			if (data['tipo'] != undefined) {
				this.setDefaultData(data['tipo']);
			} else {
				this.setDefaultData();
			}
		});
		
	}

	setDefaultData(tipo: PagoAdicionalTipo = null) {

		this.tipo.id         = (tipo != null) ? tipo.id         : null;
		this.tipo.nombre     = (tipo != null) ? tipo.nombre     : '';
		this.tipo.created_at = (tipo != null) ? tipo.created_at : null;
		this.tipo.updated_at = (tipo != null) ? tipo.updated_at : null;
		this.edit            = (tipo != null) ? true            : false;
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._tipoService.update(this.tipo).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._tipoService.save(this.tipo).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/pago-adicional/tipos']);
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
