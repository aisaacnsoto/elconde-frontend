import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Global } from 'src/app/utils/global';

declare var $;
declare var toastr;
import * as moment from 'moment';
import { KardexService } from 'src/app/services/kardex.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-kardex-index',
	templateUrl: './kardex-index.component.html',
	styleUrls: ['./kardex-index.component.css'],
	providers: [KardexService]
})
export class KardexIndexComponent implements OnInit {

	public productos: Array<Producto>;

	constructor(
		private _kardexService: KardexService,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this._route.data.subscribe(data => {
			this.productos = data['productos'];
			$('#productos').select2({
				theme: 'bootstrap4'
			});
		});
		this.loadTable(true);
	}

	loadTable(init: boolean, url: string = '') {
		var table = $('#dtKardex');

		if (init) {
			table.DataTable({
				language: Global.dt.language,
				autoWidth: false,
				dom: 'Bfrtpil',
				buttons: [
					Global.dt.excel,
					Global.dt.pdf,
					Global.dt.print,
				]
			});
			return;
		}
		if (url.length == 0) return;

		table.DataTable().destroy();
		table.DataTable({
			ajax: {
				url: url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1 },
				{data: 'producto'},
				{data: 'tipo'},
				{data: null, render: (data, type, full, meta) => moment(data.fecha).format('DD/MM/YYYY') },
				{data: 'hora' },
				{data: 'doc'},
				{data: 'entrada'},
				{data: 'salida'},
				{data: 'saldo'},
			],
			createdRow: function( row, data, dataIndex ) {
				console.log(dataIndex);
				// if (data.tipo == 'Consumo Interno') {
				// 	$(row).addClass('row-yellow').addClass('text-warning');
				// } else if (data.tipo == 'Venta') {
				// 	$(row).addClass('row-red').addClass('text-danger');
				// } else if (data.tipo == 'Compra') {
				// 	$(row).addClass('row-blue').addClass('text-primary');
				// } else if (data.tipo == 'Inventario') {
				// 	$(row).addClass('row-green').addClass('text-success');
				// }
			},
			language: Global.dt.language,
			autoWidth: false,
			dom: 'Bfrtpil',
			buttons: [
				Global.dt.excel,
				// Global.dt.pdf,
				Global.dt.print,
			]
		});
	}

	onSearch() {
		let selectedItem = $('#productos').select2('data');
		let selectedItemId = +selectedItem[0].id;

		let errores = 0;
		if (+selectedItemId <= 0) {
			toastr.error('¡Seleccione un Producto!');
			errores++;
		}
		if (errores > 0) return;

		this.loadTable(false, `${this._kardexService.url}/${selectedItemId}`);
	}
}
