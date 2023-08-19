import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import { UnidadMedida } from 'src/app/models/unidad_medida';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-unidad-medida-create',
	templateUrl: './unidad-medida-create.component.html',
	styleUrls: ['./unidad-medida-create.component.css'],
	providers: [UnidadMedidaService]
})
export class UnidadMedidaCreateComponent implements OnInit {

	unidadMedida: UnidadMedida;
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _unidadMedidaService: UnidadMedidaService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;
		this.unidadMedida = new UnidadMedida();

		this._route.data.subscribe(data => {

			if (data['unidad'] != undefined) {
				this.setDefaultData(data['unidad']);
			} else {
				this.setDefaultData();
			}
		});
		
	}

	setDefaultData(unidadMedida: UnidadMedida = null) {

		this.unidadMedida.id         = (unidadMedida != null) ? unidadMedida.id         : null;
		this.unidadMedida.unidad     = (unidadMedida != null) ? unidadMedida.unidad     : '';
		this.unidadMedida.factor     = (unidadMedida != null) ? unidadMedida.factor     : 1;
		this.unidadMedida.created_at = (unidadMedida != null) ? unidadMedida.created_at : null;
		this.unidadMedida.updated_at = (unidadMedida != null) ? unidadMedida.updated_at : null;
		this.edit                    = (unidadMedida != null) ? true                    : false;
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._unidadMedidaService.update(this.unidadMedida).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._unidadMedidaService.save(this.unidadMedida).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/productos/unidades-medida']);
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
