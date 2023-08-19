import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-servicio-list',
	templateUrl: './servicio-list.component.html',
	styleUrls: ['./servicio-list.component.css'],
	providers: [ServicioService, CurrencyPipe]
})
export class ServicioListComponent implements OnInit {

	servicio: Servicio = null;

	constructor(
		private _servicioService: ServicioService,
		private _router: Router,
		private _currencyPipe: CurrencyPipe
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtServicios').DataTable({
			ajax: {
				url: this._servicioService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'nombre'},
				{data: null, render: (data, type, full, meta) => data.tiempo_promedio + ' minutos' },
				{
					data: null,
					render: (data, type, full, meta) => this._currencyPipe.transform(data.precio, 'S/ ')
				},
				{data: 'pago_comision'},
				{data: null, render: (data, type, full, meta) => data.activo == 1 ? '<button class="btn btn-success">Activo</button>' : '<button class="btn btn-danger">Inactivo</button>' },
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

		$('#dtServicios tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/servicios/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtServicios tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.servicio = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/servicios/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._servicioService.delete(this.servicio.id).subscribe(
			res => {
				$('#dtServicios').DataTable().ajax.reload();
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
