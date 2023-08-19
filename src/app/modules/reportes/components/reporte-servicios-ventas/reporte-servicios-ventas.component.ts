import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ReporteService } from 'src/app/services/reporte.service';

declare var $;
declare var toastr;

@Component({
	selector: 'app-reporte-servicios-ventas',
	templateUrl: './reporte-servicios-ventas.component.html',
	styleUrls: ['./reporte-servicios-ventas.component.css']
})
export class ReporteServiciosVentasComponent implements OnInit {

	public return_to: string;
	public data: any;
	public fecha: string;

	constructor(
		private _route: ActivatedRoute,
		private _reporteService: ReporteService
	) { }

	ngOnInit(): void {
		// Obtener parametro de la url
		this._route.queryParams.subscribe( params => {
			this.return_to = ( params['return_to'] != undefined ) ? params['return_to'] : 'ventas';
		} );

		this.fecha = moment().format('YYYY-MM-DD');
		this.fetchData();
	}

	fetchData() {
		this.data = null;
		this._reporteService.resumenServiciosVentas(this.fecha).subscribe(
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

}
