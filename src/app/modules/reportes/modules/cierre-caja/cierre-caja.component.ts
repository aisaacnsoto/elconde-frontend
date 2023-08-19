import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake.min';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

pdfMake.fonts = {
	Roboto: {
		normal      : 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
		bold        : 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
		italics     : 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
		bolditalics : 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
	}
};

@Component({
	selector: 'app-cierre-caja',
	templateUrl: './cierre-caja.component.html',
	styleUrls: ['./cierre-caja.component.css'],
	providers: [ReporteService, CurrencyPipe, DatePipe]
})
export class CierreCajaComponent implements OnInit {
	
	public data;
	public fecha: string;
	public return_to: string;
	public body: Array<any> = [];
	public bodyDenominaciones: Array<any> = [];

	constructor(
		private _reporteService: ReporteService,
		private _currencyPipe: CurrencyPipe,
		private _datePipe: DatePipe,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.fecha = moment().format('YYYY-MM-DD');

		this._route.queryParams.subscribe( params => {
			this.return_to = ( params['return_to'] != undefined ) ? params['return_to'] : 'reportes';
		} );
	}

	fetchData() {
		let id = 'btnConsultar';
		this.data = null;
		this.showProcessingIndicator(id);
		this._reporteService.cierreCaja(this.fecha).subscribe(
			res => {
				console.log(res);
				this.data = res;
				this.showProcessingIndicator(id, false);
				this.renderPDF();
			},
			err => {
				console.log(err);
				this.showProcessingIndicator(id, false);
			}
		);
	}

	renderPDF() {
		this.body = [];
		this.bodyDenominaciones = [];
		this.getApertura();
		this.getServicios();
		this.getVentas();
		this.getPagoPersonal();
		this.getTarjeta();
		this.getGastos();
		this.getTotal();
		this.getDiferencia();
		this.getDenominaciones();

		const docDefinition = {
			content: [
				{text: 'EL CONDE BARBERSHOP', fontSize: 11, bold: true},
				{
					table: {
						widths: [ '*' ],
						body: [
							[ {text: 'CIERRE DE CAJA', fontSize: 14, bold: true, alignment: 'center'} ]
					   	]
					}
				},
				{
					table: {
						widths: [ 50, '*' ],
						body: [
							[
								{
									text: 'Fecha', border: [ false, false, false, true ]
								},
								{
									text: this._datePipe.transform(this.data.fecha, 'dd/MM/yyyy'), border: [ false, false, false, true ]
								}
							],
					   	]
					}
				},
				{
					layout: 'noBorders',
					table: {
						headerRows: 1,
						widths: [ 'auto', '*', 60, 75 ],
			
						body: this.body
					},
				},
				{ text: 'DETALLE DE EFECTIVO', bold: true },
				{
					layout: 'headerLineOnly',
					table: {
						headerRows: 1,
						body: this.bodyDenominaciones
					},
				},
			]
		};

		pdfMake.createPdf(docDefinition).getDataUrl(outDoc => {
			document.getElementById('reportViewer').setAttribute('src', outDoc);
		});
	}

	getApertura() {

		this.body.push([
			{ text: 'APERTURA DE CAJA' }, '', '', ''
		]);

		this.body.push([
			'',
			{ text: 'TOTAL APERTURA DE CAJA', alignment: 'right', bold: true },
			'',
			{ text: this._currencyPipe.transform(this.data.apertura, 'S/ '), alignment: 'right' }
		]);
	}

	getServicios() {
		if (this.data.servicios.total_servicios > 0) {

			this.body.push([
				{ text: 'SERVICIOS' }, '', '', ''
			]);

			// if (this.data.servicios.total_efectivo > 0) {
			// 	this.body.push([
			// 		'',
			// 		{ text: 'SERVICIOS EFECTIVO' },
			// 		{ text: this._currencyPipe.transform(this.data.servicios.total_efectivo, 'S/ '), alignment: 'right' },
			// 		''
			// 	]);
			// }
	
			// if (this.data.servicios.total_pago_personal > 0) {
			// 	this.body.push([
			// 		'',
			// 		{ text: 'PAGO PERSONAL' },
			// 		{ text: this._currencyPipe.transform(this.data.servicios.total_pago_personal * -1, 'S/ '), alignment: 'right' },
			// 		''
			// 	]);
			// }
	
			this.body.push([
				'',
				{ text: 'TOTAL SERVICIOS', alignment: 'right', bold: true },
				'',
				{ text: this._currencyPipe.transform(this.data.servicios.total_servicios, 'S/ '), alignment: 'right' }
			]);
		}
	}

	getVentas() {
		if (this.data.ventas.total_ventas > 0) {

			this.body.push([
				{ text: 'VENTAS' }, '', '', ''
			]);

			// if (this.data.ventas.total_efectivo > 0) {
			// 	this.body.push([
			// 		'',
			// 		{ text: 'VENTAS EFECTIVO' },
			// 		{ text: this._currencyPipe.transform(this.data.ventas.total_efectivo, 'S/ '), alignment: 'right' },
			// 		''
			// 	]);
			// }

			// if (this.data.ventas.total_pago_personal > 0) {
			// 	this.body.push([
			// 		'',
			// 		{ text: 'PAGO PERSONAL' },
			// 		{ text: this._currencyPipe.transform(this.data.ventas.total_pago_personal * -1, 'S/ '), alignment: 'right' },
			// 		''
			// 	]);
			// }

			this.body.push([
				'',
				{ text: 'TOTAL VENTAS', alignment: 'right', bold: true },
				'',
				{ text: this._currencyPipe.transform(this.data.ventas.total_ventas, 'S/ '), alignment: 'right' }
			]);
		}
	}

	getTarjeta() {
		if (this.data.tarjeta.total_tarjeta > 0) {

			this.body.push([
				{ text: 'TARJETA' }, '', '', ''
			]);

			if (this.data.tarjeta.servicios > 0) {
				this.body.push([
					'',
					{ text: 'SERVICIOS' },
					{ text: this._currencyPipe.transform(this.data.tarjeta.servicios, 'S/ '),  alignment: 'right' },
					''
				]);
			}

			if (this.data.tarjeta.ventas > 0) {
				this.body.push([
					'',
					{ text: 'VENTAS' },
					{ text: this._currencyPipe.transform(this.data.tarjeta.ventas, 'S/ '),  alignment: 'right' },
					''
				]);
			}

			this.body.push([
				'',
				{ text: 'TOTAL TARJETA', alignment: 'right', bold: true },
				'',
				{ text: this._currencyPipe.transform(this.data.tarjeta.total_tarjeta, 'S/ '), alignment: 'right' }
			]);
		}
	}

	getPagoPersonal() {
		if (this.data.pago_personal.total_pago > 0) {

			this.body.push([
				{ text: 'PAGO DE PERSONAL' }, '', '', ''
			]);

			if (this.data.pago_personal.pago_servicios > 0) {
				this.body.push([
					'',
					{ text: 'COMISIÓN POR SERVICIOS' },
					{ text: this._currencyPipe.transform(this.data.pago_personal.pago_servicios * -1, 'S/ '),  alignment: 'right' },
					''
				]);
			}

			if (this.data.pago_personal.pago_ventas > 0) {
				this.body.push([
					'',
					{ text: 'COMISIÓN POR VENTAS' },
					{ text: this._currencyPipe.transform(this.data.pago_personal.pago_ventas * -1, 'S/ '),  alignment: 'right' },
					''
				]);
			}

			this.body.push([
				'',
				{ text: 'TOTAL PAGO DE PERSONAL', alignment: 'right', bold: true },
				'',
				{ text: this._currencyPipe.transform(this.data.pago_personal.total_pago * -1, 'S/ '), alignment: 'right' }
			]);
		}
	}

	getGastos() {
		if (this.data.gastos.total > 0) {

			this.body.push([
				{ text: 'GASTOS' }, '', '', ''
			]);

			for (let i = 0; i < this.data.gastos.detalle.length; i++) {
				let gasto = this.data.gastos.detalle[i];
				let descripcion = gasto.nro_comprobante + ' ' + gasto.get_gasto_tipo.nombre + ' ' + gasto.descripcion;

				this.body.push([
					'',
					{ text: descripcion },
					{ text: this._currencyPipe.transform(gasto.total * -1, 'S/ '), alignment: 'right' },
					''
				]);
			}

			this.body.push([
				'',
				{ text: 'TOTAL GASTOS', alignment: 'right', bold: true },
				'',
				{ text: this._currencyPipe.transform(this.data.gastos.total * -1, 'S/ '), alignment: 'right' }
			]);
		}
	}

	getTotal() {

		this.body.push([
			'',
			{ text: 'TOTAL CAJA', alignment: 'right', bold: true },
			'',
			{ text: this._currencyPipe.transform(this.data.total_caja, 'S/ '), alignment: 'right', border: [false, false, false, true] }
		]);
	}

	getDiferencia() {

		this.body.push([
			'',
			{ text: 'REGISTRO DE LIQUIDACION', alignment: 'right', bold: true },
			'',
			{ text: this._currencyPipe.transform(this.data.liquidacion, 'S/ '), alignment: 'right', border: [false, false, false, true] }
		]);

		this.body.push([
			'',
			{ text: this.data.diferencia.descripcion, alignment: 'right', bold: true },
			'',
			{ text: this._currencyPipe.transform(this.data.diferencia.monto, 'S/ '), alignment: 'right' }
		]);
	}

	getDenominaciones() {

		this.bodyDenominaciones.push([
			{ text: 'Denominación' },
			{ text: 'Cantidad', alignment: 'right' },
			{ text: 'Importe', alignment: 'right' },
		]);

		if (this.data.cierre.detalle != undefined) {
			
			if (this.data.cierre.detalle.bil_200 > 0) {
				this.bodyDenominaciones.push([
					'200 SOLES',
					{ text: this.data.cierre.detalle.bil_200, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.bil_200 * 200, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.bil_100 > 0) {
				this.bodyDenominaciones.push([
					'100 SOLES',
					{ text: this.data.cierre.detalle.bil_100, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.bil_100 * 100, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.bil_50 > 0) {
				this.bodyDenominaciones.push([
					'50 SOLES',
					{ text: this.data.cierre.detalle.bil_50, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.bil_50 * 50, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.bil_20 > 0) {
				this.bodyDenominaciones.push([
					'20 SOLES',
					{ text: this.data.cierre.detalle.bil_20, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.bil_20 * 20, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.bil_10 > 0) {
				this.bodyDenominaciones.push([
					'10 SOLES',
					{ text: this.data.cierre.detalle.bil_10, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.bil_10 * 10, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.mon_05 > 0) {
				this.bodyDenominaciones.push([
					'05 SOLES',
					{ text: this.data.cierre.detalle.mon_05, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.mon_05 * 5, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.mon_02 > 0) {
				this.bodyDenominaciones.push([
					'02 SOLES',
					{ text: this.data.cierre.detalle.mon_02, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.mon_02 * 2, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.mon_01 > 0) {
				this.bodyDenominaciones.push([
					'01 SOLES',
					{ text: this.data.cierre.detalle.mon_01, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.mon_01 * 1, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.mon_50 > 0) {
				this.bodyDenominaciones.push([
					'0.50 SOLES',
					{ text: this.data.cierre.detalle.mon_50, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.mon_50 * 0.5, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.mon_20 > 0) {
				this.bodyDenominaciones.push([
					'0.20 SOLES',
					{ text: this.data.cierre.detalle.mon_20, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.mon_20 * 0.2, 'S/ '), alignment: 'right' }
				]);
			}
			
			if (this.data.cierre.detalle.mon_10 > 0) {
				this.bodyDenominaciones.push([
					'0.10 SOLES',
					{ text: this.data.cierre.detalle.mon_10, alignment: 'right' },
					{ text: this._currencyPipe.transform(this.data.cierre.detalle.mon_10 * 0.1, 'S/ '), alignment: 'right' }
				]);
			}
		}
		
		this.bodyDenominaciones.push([
			{ text: 'Total Efectivo', bold: true },
			'',
			{ text: this._currencyPipe.transform(this.data.cierre.total, 'S/ '), bold: true, alignment: 'right' }
		]);
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
