import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global.service';
import { Empleado } from 'src/app/models/empleado';
import { ActivatedRoute } from '@angular/router';

declare var $;
declare var toastr;

@Component({
	selector: 'app-reporte-consumos',
	templateUrl: './reporte-consumos.component.html',
	styleUrls: ['./reporte-consumos.component.css'],
	providers: [ReporteService, GlobalService]
})
export class ReporteConsumosComponent implements OnInit {

	public data: any;
	public fechaDesde: string;
	public fechaHasta: string;
	// public empleados: Empleado[] = [];
	// public selectedEmpleado: any;

	constructor(
		private _reporteService: ReporteService,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		// this._route.data.subscribe(data => {
		// 	this.empleados = data.empleados;
		// });

		// this.selectedEmpleado = -1;
		this.fechaDesde = moment().format('YYYY-MM-DD');
		this.fechaHasta = moment().format('YYYY-MM-DD');
		this.fetchData();
	}

	fetchData() {
		this.data = null;
		this._reporteService.consumosInternos(this.fechaDesde, this.fechaHasta).subscribe(
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


