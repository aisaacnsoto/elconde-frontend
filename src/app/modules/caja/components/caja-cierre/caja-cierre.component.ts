import { Component, OnInit, DoCheck } from '@angular/core';

declare var toastr;
declare var $;
import * as moment from 'moment';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { CajaCierre } from 'src/app/models/caja-cierre';
import { CajaCierreService } from 'src/app/services/caja-cierre.service';

@Component({
	selector: 'app-caja-cierre',
	templateUrl: './caja-cierre.component.html',
	styleUrls: ['./caja-cierre.component.css'],
	providers: [CajaCierreService]
})
export class CajaCierreComponent implements OnInit, DoCheck {

	public caja_cierre: CajaCierre = {
		id: null,
		fecha: moment().format('YYYY-MM-DD'),
		bil_200: 0,
		bil_100: 0,
		bil_50: 0,
		bil_20: 0,
		bil_10: 0,
		mon_05: 0,
		mon_02: 0,
		mon_01: 0,
		mon_50: 0,
		mon_20: 0,
		mon_10: 0,
		total: 0,
		created_by: (<Usuario>this._usuarioService.getStorage()).id,
		created_at: null,
		updated_at: null,
	};
	public return_to: string;
	public fecha: string;
	public usuario: Usuario;

	constructor(
		public _cajaCierreService: CajaCierreService,
		private _usuarioService: UsuarioService,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		// Obtener parametro de la url
		this.activatedRoute.queryParams.subscribe( params => {
			this.return_to = ( params['return_to'] != undefined ) ? params['return_to'] : 'caja';
		} );
		this.activatedRoute.data.subscribe(data => {
			if (data['cierre'] != null) {
				this.setData(data['cierre']);
			}
		});
		this.usuario = <Usuario>this._usuarioService.getStorage();
	}

	ngDoCheck(): void {
		if (this.caja_cierre != null) {
			this.caja_cierre.total = 0;
	
			this.caja_cierre.total += +this.caja_cierre.bil_200 * 200;
			this.caja_cierre.total += +this.caja_cierre.bil_100 * 100;
			this.caja_cierre.total += +this.caja_cierre.bil_50 * 50;
			this.caja_cierre.total += +this.caja_cierre.bil_20 * 20;
			this.caja_cierre.total += +this.caja_cierre.bil_10 * 10;
			this.caja_cierre.total += +this.caja_cierre.mon_05 * 5;
			this.caja_cierre.total += +this.caja_cierre.mon_02 * 2;
			this.caja_cierre.total += +this.caja_cierre.mon_01 * 1;
			this.caja_cierre.total += +this.caja_cierre.mon_50 * 0.5;
			this.caja_cierre.total += +this.caja_cierre.mon_20 * 0.2;
			this.caja_cierre.total += +this.caja_cierre.mon_10 * 0.1;
		}
	}

	showLoading() { $('#fecha').attr('disabled', true); $('#spinner').show(); }
	hideLoading() { $('#fecha').attr('disabled', false); $('#spinner').hide(); }

	getApertura() {
		this.showLoading();
		this._cajaCierreService.getByDate(this.caja_cierre.fecha).subscribe(
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

	setData(caja_cierre: CajaCierre) {
		this.caja_cierre.id         = (caja_cierre != null) ? caja_cierre.id         : null;
		this.caja_cierre.bil_200    = (caja_cierre != null) ? caja_cierre.bil_200    : 0;
		this.caja_cierre.bil_100    = (caja_cierre != null) ? caja_cierre.bil_100    : 0;
		this.caja_cierre.bil_50     = (caja_cierre != null) ? caja_cierre.bil_50     : 0;
		this.caja_cierre.bil_20     = (caja_cierre != null) ? caja_cierre.bil_20     : 0;
		this.caja_cierre.bil_10     = (caja_cierre != null) ? caja_cierre.bil_10     : 0;
		this.caja_cierre.mon_05     = (caja_cierre != null) ? caja_cierre.mon_05     : 0;
		this.caja_cierre.mon_02     = (caja_cierre != null) ? caja_cierre.mon_02     : 0;
		this.caja_cierre.mon_01     = (caja_cierre != null) ? caja_cierre.mon_01     : 0;
		this.caja_cierre.mon_50     = (caja_cierre != null) ? caja_cierre.mon_50     : 0;
		this.caja_cierre.mon_20     = (caja_cierre != null) ? caja_cierre.mon_20     : 0;
		this.caja_cierre.mon_10     = (caja_cierre != null) ? caja_cierre.mon_10     : 0;
		this.caja_cierre.total      = (caja_cierre != null) ? caja_cierre.total      : 0;
		this.caja_cierre.created_by = (caja_cierre != null) ? caja_cierre.created_by : (<Usuario>this._usuarioService.getStorage()).id;
		this.caja_cierre.created_at = (caja_cierre != null) ? caja_cierre.created_at : null;
		this.caja_cierre.updated_at = (caja_cierre != null) ? caja_cierre.updated_at : null;
	}

	onSubmit() {
		this.showProcessingIndicator();
		this._cajaCierreService.save(this.caja_cierre).subscribe(
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
