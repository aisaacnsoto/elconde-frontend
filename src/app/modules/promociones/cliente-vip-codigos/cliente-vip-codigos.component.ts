import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteVIP } from 'src/app/models/cliente-vip';
import { ClienteVIPService } from 'src/app/services/cliente-vip.service';
import * as moment from 'moment';
import { Global } from 'src/app/utils/global';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-cliente-vip-codigos',
	templateUrl: './cliente-vip-codigos.component.html',
	styleUrls: ['./cliente-vip-codigos.component.css'],
	providers: [ClienteVIPService]
})
export class ClienteVipCodigosComponent implements OnInit {

	clienteVIP: ClienteVIP = null;

	constructor(
		private _clienteVIPService: ClienteVIPService,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtCodigosVIP').DataTable({
			ajax: {
				url: this._clienteVIPService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'codigo'},
				{data: null, render: (data, type, full, meta) => data.cliente.nombres+' '+data.cliente.apellidos},
				{data: null, render: (data, type, full, meta) => moment(data.fecha_desde).format('DD/MM/YYYY')},
				{data: null, render: (data, type, full, meta) => moment(data.fecha_hasta).format('DD/MM/YYYY')},
				{data: null, render: (data, type, full, meta) => data.activo == 1 ? '<button class="btn btn-success">Activo</button>' : '<button class="btn btn-danger">Inactivo</button>' },
				{defaultContent: `
					<div class="btn-group" role="group">
						<button type="button" class="btn btn-info editar">
							<i class="fas fa-edit"></i>
						</button>
						<button type="button" class="btn btn-danger eliminar">
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

		$('#dtCodigosVIP tbody').on( 'click', 'button.editar', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/promociones/clientes-vip/codigos/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtCodigosVIP tbody').on( 'click', 'button.eliminar', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.clienteVIP = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/promociones/clientes-vip/codigos/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._clienteVIPService.delete(this.clienteVIP.id).subscribe(
			res => {
				$('#dtCodigosVIP').DataTable().ajax.reload();
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
