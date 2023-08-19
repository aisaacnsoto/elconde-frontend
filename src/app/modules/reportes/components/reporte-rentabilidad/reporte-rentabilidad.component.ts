import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReporteService } from 'src/app/services/reporte.service';
import { ActivatedRoute } from '@angular/router';

declare var $;
declare var toastr;

@Component({
	selector: 'app-reporte-rentabilidad',
	templateUrl: './reporte-rentabilidad.component.html',
	styleUrls: ['./reporte-rentabilidad.component.css'],
	providers: [ReporteService]
})
export class ReporteRentabilidadComponent implements OnInit {

	public data: any;
	public fechaDesde: string;
	public fechaHasta: string;
	public reloading: boolean = false;

	constructor(
		private _reporteService: ReporteService,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.fechaDesde = moment().format('YYYY-MM-DD');
		this.fechaHasta = moment().format('YYYY-MM-DD');
	}

	fetchData() {
		let id = 'btnConsultar';
		this.reloading = true;
		this.data = null;

		this.showProcessingIndicator(id);

		this._reporteService.rentabilidad(this.fechaDesde, this.fechaHasta).subscribe(
			res => {
				this.reloading = false;
				console.log(res);
				this.data = res;
				this.showProcessingIndicator(id, false);
			},
			err => {
				this.reloading = false;
				console.log(err);
				this.data = [];
				this.showProcessingIndicator(id, false);
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
			<i class="fas fa-search mr-1"></i>
			Consultar
		`;
		
		let loadingTemplate = `
			<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
			Consultando
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
