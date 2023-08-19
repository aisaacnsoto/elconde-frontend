import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import * as moment from 'moment';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-proveedor-list',
	templateUrl: './proveedor-list.component.html',
	styleUrls: ['./proveedor-list.component.css']
})
export class ProveedorListComponent implements OnInit {

	proveedor: Proveedor = null;

	constructor(
		private _proveedorService: ProveedorService,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtProveedores').DataTable({
			ajax: {
				url: this._proveedorService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'nombre'},
				{data: 'ruc'},
				{data: 'email'},
				{data: 'direccion'},
				{data: 'telefono'},
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

		$('#dtProveedores tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/proveedores/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtProveedores tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.proveedor = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/proveedores/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._proveedorService.delete(this.proveedor.id).subscribe(
			res => {
				$('#dtProveedores').DataTable().ajax.reload();
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
