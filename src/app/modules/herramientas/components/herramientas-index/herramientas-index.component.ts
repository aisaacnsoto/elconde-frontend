import { Component, OnInit } from '@angular/core';
import { HerramientaService } from 'src/app/services/herramienta.service';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Herramienta } from 'src/app/models/herramienta';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-herramientas-index',
	templateUrl: './herramientas-index.component.html',
	styleUrls: ['./herramientas-index.component.css']
})
export class HerramientasIndexComponent implements OnInit {

	herramienta: Herramienta = null;

	constructor(
		private _herramientaService: HerramientaService,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtHerramientas').DataTable({
			ajax: {
				url: this._herramientaService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'nombre'},
				{data: 'tipo'},
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

		$('#dtHerramientas tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/herramientas/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtHerramientas tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.herramienta = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/herramientas/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._herramientaService.delete(this.herramienta.id).subscribe(
			res => {
				$('#dtHerramientas').DataTable().ajax.reload();
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
