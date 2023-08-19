import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Empleado } from 'src/app/models/empleado';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-empleados-index',
	templateUrl: './empleados-index.component.html',
	styleUrls: ['./empleados-index.component.css'],
	
})
export class EmpleadosIndexComponent implements OnInit {

	empleado: Empleado = null;

	constructor(
		private _empleadoService: EmpleadoService,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtEmpleados').DataTable({
			ajax: {
				url: this._empleadoService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'nombres'},
				{data: 'ape_paterno'},
				{data: 'ape_materno'},
				{data: 'tipo_doc'},
				{data: 'num_doc'},
				{data: 'direccion'},
				{data: 'telefono'},
				{data: 'correo'},
				{data: null, render: (data, type, full, meta) => moment(data.fecha_nac).format('DD/MM/YYYY')},
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

		$('#dtEmpleados tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/empleados/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtEmpleados tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.empleado = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/empleados/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._empleadoService.delete(this.empleado.id).subscribe(
			res => {
				$('#dtEmpleados').DataTable().ajax.reload();
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
