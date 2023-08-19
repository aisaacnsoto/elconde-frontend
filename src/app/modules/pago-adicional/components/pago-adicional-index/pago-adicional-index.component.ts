import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { PagoAdicional } from 'src/app/models/pago-adicional';
import { PagoAdicionalService } from 'src/app/services/pago-adicional.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-pago-adicional-index',
	templateUrl: './pago-adicional-index.component.html',
	styleUrls: ['./pago-adicional-index.component.css'],
	providers: [CurrencyPipe]
})
export class PagoAdicionalIndexComponent implements OnInit {

	pago: PagoAdicional = null;

	constructor(
		private _pagoService: PagoAdicionalService,
		private _currencyPipe: CurrencyPipe,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtPagoAdicional').DataTable({
			ajax: {
				url: this._pagoService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: null, render: (data, type, full, meta) => data.tipo.nombre},
				{data: null, render: (data, type, full, meta) => moment(data.fecha).format('DD/MM/YYYY')},
				{
					data: null,
					render: (data, type, full, meta) => this._currencyPipe.transform(data.monto, 'S/ ')
				},
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

		$('#dtPagoAdicional tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/pago-adicional/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtPagoAdicional tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.pago = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/pago-adicional/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._pagoService.delete(this.pago.id).subscribe(
			res => {
				$('#dtPagoAdicional').DataTable().ajax.reload();
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
