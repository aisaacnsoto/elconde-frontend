import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { PagoPersonalService } from 'src/app/services/pago-personal.service';
import * as moment from 'moment';

declare var $;
declare var toastr;

@Component({
	selector: 'app-reporte-pago-personal',
	templateUrl: './reporte-pago-personal.component.html',
	styleUrls: ['./reporte-pago-personal.component.css'],
	providers: [ReporteService, PagoPersonalService]
})
export class ReportePagoPersonalComponent implements OnInit {

	public data: any;
	public fecha: string;

	constructor(
		private _reporteService: ReporteService,
		private _pagoPersonalService: PagoPersonalService
	) { }

	ngOnInit(): void {
		this.fecha = moment().format('YYYY-MM-DD');
		this.fetchData();
	}

	actualizarPago() {
		let checked = [];
		$('input[type="checkbox"]:checked').each((i, el) => {
			checked.push(+el.id.substr(7, 2));
		});
		let info = {
			fecha: this.fecha,
			checked: checked
		};
		let id = 'btnGuardar';
		this.showProcessingIndicator(id);

		this._pagoPersonalService.update(info).subscribe(
			res => {
				// console.log(res);
				toastr.success('¡Guardado correctamente!');
				this.showProcessingIndicator(id, false);
			},
			err => {
				console.log(err);
				toastr.error('¡No se pudo guardar!');
				this.showProcessingIndicator(id, false);
			}
		);
	}

	fetchData() {
		this.data = null;
		this._reporteService.pagoEmpleados(this.fecha).subscribe(
			res => {
				console.log(res);
				this.data = res;
			},
			err => {
				console.log(err);
				this.data = [];
			}
		);
	}

	imprimir() {
		$('#seccion-imprimir').printThis({
			importCSS: true,
			importStyle: true,
			loadCSS: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
		});
	}

	showProcessingIndicator(id: string, processing: boolean = true) {
		let defaultTemplate = `
			<i class="fas fa-check mr-1"></i>
			Guardar
		`;
		
		let loadingTemplate = `
			<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
			Guardando
		`;

		if (processing) {
			this.setButtonTemplate(id, loadingTemplate, true);
		} else {
			this.setButtonTemplate(id, defaultTemplate, false);
		}
	}

	setButtonTemplate(id: string, template: string, disabled: boolean) {
		let buttonRegister = <HTMLButtonElement>document.getElementById(id);
		buttonRegister.innerHTML = template;
		buttonRegister.disabled = disabled;
	}

}
