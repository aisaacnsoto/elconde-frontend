import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { Global } from 'src/app/utils/global';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Asignacion } from 'src/app/models/asignacion';
import { Producto } from 'src/app/models/producto';
import { AsignacionBuscarProductoComponent } from '../asignacion-buscar-producto/asignacion-buscar-producto.component';

declare var $;
declare var toastr;

@Component({
	selector: 'app-asignacion-create',
	templateUrl: './asignacion-create.component.html',
	styleUrls: ['./asignacion-create.component.css'],
	providers: [AsignacionService]
})
export class AsignacionCreateComponent implements OnInit {

	public flags: Flags;
	public asignacion: Asignacion;
	public empleados: Array<Empleado>;

	@ViewChild(AsignacionBuscarProductoComponent)
	public buscarProductoCmp: AsignacionBuscarProductoComponent;

	constructor(
		private _asignacionService: AsignacionService,
		private activatedRoute: ActivatedRoute
	) {
		this.asignacion = new Asignacion();
		this.flags = new Flags();
		this.setDefaultData();
	}

	ngOnInit(): void {

		this.activatedRoute.data.subscribe(data => {
			this.empleados = data['empleados'];
		});
		this.activarDataTable();

		$('#modal-producto-asignacion').on('shown.bs.modal', function () {
			$('#inputSearchAsignacion').focus();
			$('#inputSearchAsignacion').select();
		});
	}

	onSubmit(deleteMode: boolean = false): void {
		if (deleteMode) {
			this.showProcessingIndicator('delete');
			this._asignacionService.delete(this.asignacion.id).subscribe(
				() => this.onSuccess('delete', '¡Eliminado correctamente!'),
				err => this.onError('delete', '¡No se pudo eliminar!', err)
			);
		} else {
			this.showProcessingIndicator('default');
			if (this.flags.edit) {
				this._asignacionService.update(this.asignacion).subscribe(
					() => this.onSuccess('default', '¡Actualizado correctamente!'),
					error => this.onError('default', '¡No se pudo actualizar!', error)
				);
			} else {
				this._asignacionService.save(this.asignacion).subscribe(
					() => this.onSuccess('default', '¡Registrado correctamente!'),
					error => this.onError('default', '¡No se pudo registrar!', error)
				);
			}
		}
	}

	setDefaultData(asignacion: Asignacion = null) {
		let fecha                       = moment().format('YYYY-MM-DD');
		// let currentUser                 = <Usuario>this._usuarioService.getStorage();
		this.asignacion.id              = (asignacion != null) ? asignacion.id              : null;
		this.asignacion.empleado        = (asignacion != null) ? asignacion.empleado.id     : -1;
		this.asignacion.cantidad        = (asignacion != null) ? asignacion.cantidad        : 1;
		this.asignacion.producto_id     = (asignacion != null) ? asignacion.producto_id     : -1;
		this.asignacion.producto_nombre = (asignacion != null) ? asignacion.producto.producto.nombre : '';
		this.asignacion.fecha           = (asignacion != null) ? asignacion.fecha           : fecha;
		this.asignacion.created_at      = (asignacion != null) ? asignacion.created_at      : null;
		this.asignacion.updated_at      = (asignacion != null) ? asignacion.updated_at      : null;
		this.flags.edit                 = (asignacion != null) ? true                       : false;
	}

	activarDataTable() {
		var table = $('#dtAsignaciones').DataTable({
			ajax: {
				url: this._asignacionService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: null, render: (data) => data.empleado != null ? data.empleado.nombres+' '+data.empleado.ape_paterno+' '+data.empleado.ape_materno : ''},
				{data: 'cantidad'},
				{data: null, render: (data) => data.producto != null ? data.producto.producto.nombre : ''},
				{data: null, render: (data) => data.producto != null ? data.producto.unidad_medida.unidad : ''},
				{data: null, render: (data) => data.fecha ? moment(data.fecha).format('DD/MM/YYYY') : ''},
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

		$('#dtAsignaciones tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.flags.edit = true;
			self.setDefaultData(<Asignacion>data);
		} );

		$('#dtAsignaciones tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.flags.edit = true;
			self.setDefaultData(<Asignacion>data);
			$('#modal-delete').modal('show');
		} );
	}
	
	onSelectProducto(event) {
		let producto = event.producto;

		if (producto.stock >= 1) {
			this.asignacion.producto_id = producto.id;
			this.asignacion.producto_nombre = producto.nombre;
			$('#modal-producto-asignacion').modal('hide');
		} else {
			toastr.error('El producto no está en stock.');
		}
	}
	
	onSuccess(mode: string, alertMessage: string) {
		// form.markAsUntouched();
		$('#dtAsignaciones').DataTable().ajax.reload();
		this.setDefaultData();
		this.showProcessingIndicator(mode, false);
		toastr.success(alertMessage);
		$('#modal-delete').modal('hide');
		this.buscarProductoCmp.clear();
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