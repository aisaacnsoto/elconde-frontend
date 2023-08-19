import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { GastoTipoService } from 'src/app/services/gasto-tipo.service';
import { GastoTipo } from 'src/app/models/gasto-tipo';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-gasto-tipo-create',
	templateUrl: './gasto-tipo-create.component.html',
	styleUrls: ['./gasto-tipo-create.component.css'],
	providers: [GastoTipoService]
})
export class GastoTipoCreateComponent implements OnInit {

	gastoTipo: GastoTipo = {
		id: null,
		nombre: '',
		created_at: null,
		updated_at: null
	};
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _gastoTipoService: GastoTipoService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;

		this._route.data.subscribe(data => {

			if (data['tipo'] != undefined) {
				this.edit = true;
				this.gastoTipo = data['tipo'];
			}
		});
		
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._gastoTipoService.update(this.gastoTipo).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._gastoTipoService.save(this.gastoTipo).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/gastos/tipos']);
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
