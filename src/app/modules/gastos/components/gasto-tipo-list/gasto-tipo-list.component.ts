import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import { GastoTipo } from 'src/app/models/gasto-tipo';
import { GastoTipoService } from 'src/app/services/gasto-tipo.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-gasto-tipo-list',
	templateUrl: './gasto-tipo-list.component.html',
	styleUrls: ['./gasto-tipo-list.component.css']
})
export class GastoTipoListComponent implements OnInit {

	gastoTipo: GastoTipo = null;

	constructor(
		private _gastoTipoService: GastoTipoService,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtGastosTipos').DataTable({
			ajax: {
				url: this._gastoTipoService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'nombre'},
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

		$('#dtGastosTipos tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/gastos/tipos/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtGastosTipos tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.gastoTipo = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/gastos/tipos/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._gastoTipoService.delete(this.gastoTipo.id).subscribe(
			res => {
				$('#dtGastosTipos').DataTable().ajax.reload();
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
