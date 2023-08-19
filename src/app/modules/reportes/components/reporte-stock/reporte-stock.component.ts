import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReporteService } from 'src/app/services/reporte.service';
import { Global } from 'src/app/utils/global';
import * as moment from 'moment';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-reporte-stock',
	templateUrl: './reporte-stock.component.html',
	styleUrls: ['./reporte-stock.component.css'],
	providers: [Title]
})
export class ReporteStockComponent implements OnInit {

	constructor(
		private _reporteService: ReporteService,
		private _titleService: Title
	) { }

	ngOnInit() {
		this._titleService.setTitle(`Productos en Stock ${moment().format('DD/MM/YYYY')}`);
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtStock').DataTable({
			ajax: {
				url: this._reporteService.url+'/stock',
				dataSrc: 'detalle'
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'producto'},
				{data: 'unidad'},
				{data: 'stock'},
				{data: 'costo'},
			],
			language: Global.dt.language,
			autoWidth: false,
			dom: 'Bfrtpil',
			buttons: [
				Global.dt.excel,
				Global.dt.print,
			]
		});
	}

}
