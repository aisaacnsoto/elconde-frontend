import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { HerramientaService } from 'src/app/services/herramienta.service';
import { Herramienta } from 'src/app/models/herramienta';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-herramientas-create',
	templateUrl: './herramientas-create.component.html',
	styleUrls: ['./herramientas-create.component.css']
})
export class HerramientasCreateComponent implements OnInit {

	herramienta: Herramienta;
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _herramientaService: HerramientaService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;
		this.herramienta = new Herramienta();

		this._route.data.subscribe(data => {

			if (data.herramienta != undefined) {
				this.setDefaultData(data.herramienta);
			} else {
				this.setDefaultData();
			}
		});
		
	}

	setDefaultData(herramienta: Herramienta = null) {

		this.herramienta.id                    = (herramienta != null) ? herramienta.id                    : null;
		this.herramienta.nombre                = (herramienta != null) ? herramienta.nombre                : '';
		this.herramienta.tipo                  = (herramienta != null) ? herramienta.tipo                  : '-1';
		this.herramienta.created_at            = (herramienta != null) ? herramienta.created_at            : null;
		this.herramienta.updated_at            = (herramienta != null) ? herramienta.updated_at            : null;
		this.edit                              = (herramienta != null) ? true                              : false;
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._herramientaService.update(this.herramienta).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._herramientaService.save(this.herramienta).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/herramientas']);
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
