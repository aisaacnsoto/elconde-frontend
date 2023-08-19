import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/services/compra.service';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { Compra } from 'src/app/models/compra';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-compras-list',
	templateUrl: './compras-list.component.html',
	styleUrls: ['./compras-list.component.css'],
	providers: [CompraService, CurrencyPipe]
})
export class ComprasListComponent implements OnInit {

	compra: Compra = null;

	constructor(
		private _compraService: CompraService,
		private _router: Router,
		private _currencyPipe: CurrencyPipe
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtCompras').DataTable({
			ajax: {
				url: this._compraService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: null, render: (data, type, full, meta) => moment(data.fecha_inter).format('DD/MM/YYYY')},
				{data: 'hora_inter'},
				{data: null, render: (data, type, full, meta) => data.get_proveedor ? data.get_proveedor.nombre : '' },
				{data: null, render: (data, type, full, meta) => data.tipo_doc+' '+data.nro_doc_pref+'-'+data.nro_doc_suf },
				{data: null, render: (data, type, full, meta) => this._currencyPipe.transform(data.total, 'S/ ')},
				{defaultContent: `
					<div class="btn-group" role="group">
						<button type="button" class="btn btn-info">
							<i class="fas fa-edit"></i>
						</button>
						<button type="button" class="btn btn-danger">
							<i class="fas fa-trash-alt"></i>
						</button>
					</div>
				`},
			],
			language: Global.dt.language,
			autoWidth: false,
			dom: 'Bfrtpil',
			buttons: [
				Global.dt.excel,
				Global.dt.print,
			]
		});

		let self = this;

		$('#dtCompras tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/compras/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtCompras tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.compra = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/compras/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._compraService.delete(this.compra.id).subscribe(
			res => {
				$('#dtCompras').DataTable().ajax.reload();
				toastr.success('¡Eliminado correctamente!');
				this.showProcessingIndicator(false);
				$('#modal-delete').modal('hide');
			},
			err => {
				console.log(err);
				toastr.error('¡No se pudo eliminar!');
				this.showProcessingIndicator(false);
				$('#modal-delete').modal('hide');
			}
		);
	}

	showProcessingIndicator(processing: boolean = true) {
		let buttonRegister = <HTMLButtonElement>document.getElementById('buttonDelete');
		if (processing) {
			buttonRegister.innerHTML = `
				<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
				Eliminando
			`;
			buttonRegister.disabled = true;
		} else {
			buttonRegister.innerHTML = `
				<i class="fas fa-ban mr-1"></i>
				Eliminar
			`;
			buttonRegister.disabled = false;
		}
	}
}
