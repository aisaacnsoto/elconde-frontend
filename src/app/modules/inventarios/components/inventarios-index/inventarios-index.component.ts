import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Inventario } from 'src/app/models/inventario';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-inventarios-index',
	templateUrl: './inventarios-index.component.html',
	styleUrls: ['./inventarios-index.component.css'],
	providers: [InventarioService]
})
export class InventariosIndexComponent implements OnInit {

	inventario: Inventario = null;

	constructor(
		private _inventarioService: InventarioService,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtInventarios').DataTable({
			ajax: {
				url: this._inventarioService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'comentario'},
				{data: null, render: (data, type, full, meta) => moment(data.fecha).format('DD/MM/YYYY')},
				{data: 'hora'},
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

		$('#dtInventarios tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/inventarios/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtInventarios tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.inventario = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/inventarios/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._inventarioService.delete(this.inventario.id).subscribe(
			res => {
				$('#dtInventarios').DataTable().ajax.reload();
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
