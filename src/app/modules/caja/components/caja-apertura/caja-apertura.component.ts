import { Component, OnInit, DoCheck } from '@angular/core';
import { CajaApertura } from 'src/app/models/caja-apertura';
import { CajaAperturaService } from 'src/app/services/caja-apertura.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

// import * as toastr from 'admin-lte/plugins/toastr';
declare var toastr;
declare var $;

@Component({
	selector: 'app-caja-apertura',
	templateUrl: './caja-apertura.component.html',
	styleUrls: ['./caja-apertura.component.css'],
	providers: [CajaAperturaService]
})
export class CajaAperturaComponent implements OnInit {

	public caja_apertura: CajaApertura = {
		id         : null,
		fecha      : moment().format('YYYY-MM-DD'),
		total      : 0,
		created_by : (<Usuario>this._usuarioService.getStorage()).id,
		created_at : null,
		updated_at : null
	};
	public return_to: string;
	public fecha: string;
	public usuario: Usuario;

	constructor(
		public _cajaAperturaService: CajaAperturaService,
		private _usuarioService: UsuarioService,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		// Obtener parametro de la url
		this.activatedRoute.queryParams.subscribe( params => {
			this.return_to = ( params['return_to'] != undefined ) ? params['return_to'] : 'caja';
		} );

		this.activatedRoute.data.subscribe(data => {
			if (data['apertura'] != null) {
				this.setData(data['apertura']);
			}
		});

		this.usuario = <Usuario>this._usuarioService.getStorage();
	}

	showLoading() { $('#fecha').attr('disabled', true); $('#spinner').show(); }
	hideLoading() { $('#fecha').attr('disabled', false); $('#spinner').hide(); }

	getApertura() {
		this.showLoading();
		this._cajaAperturaService.getByDate(this.caja_apertura.fecha).subscribe(
			res => {

				this.hideLoading();
				this.setData(res);
			},
			err => {
				console.log(err);
				this.hideLoading();
			}
		);
	}

	setData(caja_apertura: CajaApertura) {
		this.caja_apertura.id         = (caja_apertura != null) ? caja_apertura.id         : null,
		// this.caja_apertura.fecha      = (caja_apertura != null) ? caja_apertura.fecha      : moment().format('YYYY-MM-DD'),
		this.caja_apertura.total      = (caja_apertura != null) ? caja_apertura.total      : 0,
		this.caja_apertura.created_by = (caja_apertura != null) ? caja_apertura.created_by : (<Usuario>this._usuarioService.getStorage()).id,
		this.caja_apertura.created_at = (caja_apertura != null) ? caja_apertura.created_at : null,
		this.caja_apertura.updated_at = (caja_apertura != null) ? caja_apertura.updated_at : null
	}

	onSubmit() {
		this.showProcessingIndicator();
		this._cajaAperturaService.save(this.caja_apertura).subscribe(
			res => this.onSuccess('¡Guardado correctamente!'),
			err => this.onError('¡No se pudo guardar!', err)
		);
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
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
