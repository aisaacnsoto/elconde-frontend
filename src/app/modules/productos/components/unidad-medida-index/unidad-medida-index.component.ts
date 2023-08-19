import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import { UnidadMedida } from 'src/app/models/unidad_medida';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import * as moment from 'moment';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-unidad-medida-index',
  templateUrl: './unidad-medida-index.component.html',
  styleUrls: ['./unidad-medida-index.component.css']
})
export class UnidadMedidaIndexComponent implements OnInit {

	unidadMedida: UnidadMedida = null;

	constructor(
		private _unidadMedidaService: UnidadMedidaService,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtUnidadesMedida').DataTable({
			ajax: {
				url: this._unidadMedidaService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'unidad'},
				{data: 'factor'},
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

		$('#dtUnidadesMedida tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/productos/unidades-medida/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtUnidadesMedida tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.unidadMedida = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/productos/unidades-medida/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._unidadMedidaService.delete(this.unidadMedida.id).subscribe(
			res => {
				$('#dtUnidadesMedida').DataTable().ajax.reload();
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
