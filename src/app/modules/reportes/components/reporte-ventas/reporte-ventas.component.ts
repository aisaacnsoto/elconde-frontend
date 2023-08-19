import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

declare var $;
declare var toastr;

@Component({
	selector: 'app-reporte-ventas',
	templateUrl: './reporte-ventas.component.html',
	styleUrls: ['./reporte-ventas.component.css'],
	providers: [ReporteService]
})
export class ReporteVentasComponent implements OnInit {

	public data: any;
	public fechaDesde: string;
	public fechaHasta: string;
	public metodoPago: string = '-1';
	public reloading: boolean = false;
	public productos: Array<any> = [];
	public producto: any = '-1';
	public servicios: Array<any> = [];
	public servicio: any = '-1';
	public productoChecked: boolean = true;
	public servicioChecked: boolean = true;

	constructor(
		private _reporteService: ReporteService,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.fechaDesde = moment().format('YYYY-MM-DD');
		this.fechaHasta = moment().format('YYYY-MM-DD');

		this._route.data.subscribe(data => {
			this.productos = data['productos'];
			this.servicios = data['servicios'];
		});
	}

	fetchData() {
		let id = 'btnConsultar';
		this.reloading = true;
		this.data = null;

		this.showProcessingIndicator(id);

		let selectedProducto = this.productoChecked ? this.producto : '0';
		let selectedServicio = this.servicioChecked ? this.servicio : '0';

		this._reporteService.ventas(this.fechaDesde, this.fechaHasta, this.metodoPago, selectedProducto, selectedServicio).subscribe(
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

	toggleProducto() {
		this.productoChecked = !this.productoChecked;
	}

	toggleServicio() {
		this.servicioChecked = !this.servicioChecked;
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
