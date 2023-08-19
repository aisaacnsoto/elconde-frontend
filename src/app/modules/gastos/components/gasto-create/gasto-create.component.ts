import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

declare var $;
import * as moment from 'moment';
import { GastoService } from 'src/app/services/gasto.service';
import { Gasto } from 'src/app/models/gasto';
import { GastoTipo } from 'src/app/models/gasto-tipo';
import { Global } from 'src/app/utils/global';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
declare var toastr;

@Component({
	selector: 'app-gasto-create',
	templateUrl: './gasto-create.component.html',
	styleUrls: ['./gasto-create.component.css'],
	providers: [GastoService]
})
export class GastoCreateComponent implements OnInit {

	public flags: Flags;
	public gasto: Gasto;
	public gastoTipos: Array<GastoTipo>;
	public return_to: string;

	constructor(
		private _gastoService: GastoService,
		private _usuarioService: UsuarioService,
		private activatedRoute: ActivatedRoute
	) {
		this.gasto = new Gasto();
		this.flags = new Flags();
		this.setDefaultData();
	}

	ngOnInit(): void {
		// Obtener parametro de la url
		this.activatedRoute.queryParams.subscribe( params => {
			this.return_to = ( params['return_to'] != undefined ) ? params['return_to'] : 'gastos';
		} );
		
		this.activatedRoute.data.subscribe(data => {
			this.gastoTipos = data['tipos'];
		});
		this.activarDataTable();
	}

	onSubmit(form, deleteMode: boolean = false): void {
		if (deleteMode) {
			this.showProcessingIndicator('delete');
			this._gastoService.delete(this.gasto.id).subscribe(
				res => this.onSuccess(form, 'delete', '¡Eliminado correctamente!'),
				err => this.onError('delete', '¡No se pudo eliminar!', err)
			);
		} else {
			this.showProcessingIndicator('default');
			if (this.flags.edit) {
				this._gastoService.update(this.gasto).subscribe(
					response => this.onSuccess(form, 'default', '¡Actualizado correctamente!'),
					error => this.onError('default', '¡No se pudo actualizar!', error)
				);
			} else {
				this._gastoService.save(this.gasto).subscribe(
					response => this.onSuccess(form, 'default', '¡Registrado correctamente!'),
					error => this.onError('default', '¡No se pudo registrar!', error)
				);
			}
		}
	}

	setDefaultData(gasto: Gasto = null) {
		let fecha                   = moment().format('YYYY-MM-DD');
		let currentUser             = <Usuario>this._usuarioService.getStorage();
		this.gasto.id               = (gasto != null) ? gasto.id               : null;
		this.gasto.fecha            = (gasto != null) ? gasto.fecha            : fecha;
		this.gasto.nro_comprobante  = (gasto != null) ? gasto.nro_comprobante  : '';
		this.gasto.tipo_comprobante = (gasto != null) ? gasto.tipo_comprobante : 'BOLETA DE VENTA';
		this.gasto.tipo_gasto       = (gasto != null) ? gasto.tipo_gasto       : -1;
		this.gasto.descripcion      = (gasto != null) ? gasto.descripcion      : '';
		this.gasto.total            = (gasto != null) ? gasto.total            : 0;
		this.gasto.created_by       = (gasto != null) ? gasto.created_by       : currentUser.id;
		this.gasto.created_at       = (gasto != null) ? gasto.created_at       : '';
		this.gasto.updated_at       = (gasto != null) ? gasto.updated_at       : '';
		this.flags.edit             = (gasto != null) ? true                   : false;
	}

	activarDataTable() {
		var table = $('#dtGastos').DataTable({
			ajax: {
				url: this._gastoService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: null, render: (data, type, full, meta) => moment(data.fecha).format('DD/MM/YYYY')},
				{data: 'tipo_comprobante'},
				{data: 'nro_comprobante'},
				{data: null, render: (data, type, full, meta) => data.get_gasto_tipo.nombre},
				{data: 'descripcion'},
				{data: 'total'},
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
				// Global.dt.pdf,
				Global.dt.print,
			]
		});

		let self = this;

		$('#dtGastos tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.flags.edit = true;
			self.setDefaultData(<Gasto>data);
		} );

		$('#dtGastos tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.flags.edit = true;
			self.setDefaultData(<Gasto>data);
			$('#modal-delete').modal('show');
		} );
	}
	
	onSuccess(form, mode: string, alertMessage: string) {
		// form.markAsUntouched();
		$('#dtGastos').DataTable().ajax.reload();
		this.setDefaultData();
		this.showProcessingIndicator(mode, false);
		toastr.success(alertMessage);
		$('#modal-delete').modal('hide');
	}

	onError(mode: string, alertMessage: string, err: any) {
		console.log(err);
		this.showProcessingIndicator(mode, false);
		toastr.error(alertMessage);
		$('#modal-delete').modal('hide');
	}

	showProcessingIndicator(type: string = 'default', processing: boolean = true) {
		let defaultTemplate = `
			<i class="fas fa-check mr-1"></i>
		`;
		let loadingTemplate = `
			<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
		`;

		switch (type) {
			case 'default':
				if (processing) {
					this.setButtonTemplate('buttonRegister', loadingTemplate + 'Guardando', true);
				} else {
					this.setButtonTemplate('buttonRegister', defaultTemplate + 'Guardar', false);
				}
				break;
			case 'delete':
				if (processing) {
					this.setButtonTemplate('buttonDelete', loadingTemplate + 'Eliminando', true);
				} else {
					this.setButtonTemplate('buttonDelete', defaultTemplate + 'Eliminar', false);
				}
				break;
			default: break;
		}
	}

	setButtonTemplate(elementId: string, template: string, disabled: boolean) {
		let buttonRegister = <HTMLButtonElement>document.getElementById(elementId);
		buttonRegister.innerHTML = template;
		buttonRegister.disabled = disabled;
	}
}

class Flags {
	public edit: boolean;
}