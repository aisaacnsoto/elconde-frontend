import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-proveedor-create',
	templateUrl: './proveedor-create.component.html',
	styleUrls: ['./proveedor-create.component.css'],
	providers: [ProveedorService]
})
export class ProveedorCreateComponent implements OnInit {

	proveedor: Proveedor = {
		id: null,
		nombre: '',
		ruc: '',
		email: '',
		direccion: '',
		telefono: '',
		activo: 1,
		created_at: null,
		updated_at: null
	};
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _proveedorService: ProveedorService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;

		this._route.data.subscribe(data => {

			if (data['proveedor'] != undefined) {
				this.edit = true;
				this.proveedor = data['proveedor'];
			}
		});
		
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._proveedorService.update(this.proveedor).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._proveedorService.save(this.proveedor).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/proveedores']);
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
