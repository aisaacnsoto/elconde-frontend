import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global.service';

declare var $;
declare var toastr;

@Component({
	selector: 'app-reporte-gastos-mensual',
	templateUrl: './reporte-gastos-mensual.component.html',
	styleUrls: ['./reporte-gastos-mensual.component.css'],
	providers: [ReporteService, GlobalService]
})
export class ReporteGastosMensualComponent implements OnInit {

	public data: any;
	public fechaDesde: string;
	public fechaHasta: string;

	constructor(
		private _reporteService: ReporteService
	) { }

	ngOnInit(): void {
		this.fechaDesde = moment().format('YYYY-MM-DD');
		this.fechaHasta = moment().format('YYYY-MM-DD');
		this.fetchData();
	}

	fetchData() {
		this.data = null;
		this._reporteService.gastosMensual(this.fechaDesde, this.fechaHasta).subscribe(
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

}
