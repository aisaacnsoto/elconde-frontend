import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import * as moment from 'moment';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-cliente-list',
	templateUrl: './cliente-list.component.html',
	styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

	cliente: Cliente = null;

	constructor(
		private _clienteService: ClienteService,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtClientes').DataTable({
			ajax: {
				url: this._clienteService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'nombres'},
				{data: 'apellidos'},
				{data: null, render: (data, type, full, meta) => data.tipo_doc+' '+data.num_doc},
				{data: 'telefono'},
				{data: null, render: (data, type, full, meta) => this.formatDate(data.fecha_nac)},
				{data: 'direccion'},
				{data: 'correo'},
				{data: 'descripcion'},
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

		$('#dtClientes tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/clientes/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtClientes tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.cliente = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/clientes/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._clienteService.delete(this.cliente.id).subscribe(
			res => {
				$('#dtClientes').DataTable().ajax.reload();
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

	formatDate(date) {
		let html = '';
		html += `<span class="d-none">${date}</span>`;

		let formattedDate = moment(date).format('DD/MM/YYYY');
		html += `<span>${formattedDate}</span>`;
		return html;
	}
}
