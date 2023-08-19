import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { Global } from 'src/app/utils/global';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { ConsumoInternoService } from 'src/app/services/consumo-interno.service';
import { ConsumoInterno } from 'src/app/models/consumo-interno';
import { Producto } from 'src/app/models/producto';
import { ConsumoBuscarProductoComponent } from '../consumo-buscar-producto/consumo-buscar-producto.component';

declare var $;
declare var toastr;

@Component({
	selector: 'app-consumos-internos-create',
	templateUrl: './consumos-internos-create.component.html',
	styleUrls: ['./consumos-internos-create.component.css'],
	providers: [ConsumoInternoService]
})
export class ConsumosInternosCreateComponent implements OnInit {

	public flags: Flags;
	public consumoInterno: ConsumoInterno;
	public empleados: Array<Empleado>;
	public productos: Array<Producto>;

	@ViewChild(ConsumoBuscarProductoComponent)
	public buscarProductoCmp: ConsumoBuscarProductoComponent;

	constructor(
		private _consumoInternoService: ConsumoInternoService,
		private activatedRoute: ActivatedRoute
	) {
		this.consumoInterno = new ConsumoInterno();
		this.flags = new Flags();
		this.setDefaultData();
	}

	ngOnInit(): void {

		this.activatedRoute.data.subscribe(data => {
			this.empleados = data['empleados'];
			this.productos = data['productos'];
		});
		this.activarDataTable();

		$('#modal-producto-consumo').on('shown.bs.modal', function () {
			$('#inputSearchConsumo').focus();
			$('#inputSearchConsumo').select();
		});
	}

	onSubmit(deleteMode: boolean = false): void {
		if (deleteMode) {
			this.showProcessingIndicator('delete');
			this._consumoInternoService.delete(this.consumoInterno.id).subscribe(
				() => this.onSuccess('delete', '¡Eliminado correctamente!'),
				err => this.onError('delete', '¡No se pudo eliminar!', err)
			);
		} else {
			this.showProcessingIndicator('default');
			if (this.flags.edit) {
				this._consumoInternoService.update(this.consumoInterno).subscribe(
					() => this.onSuccess('default', '¡Actualizado correctamente!'),
					error => this.onError('default', '¡No se pudo actualizar!', error)
				);
			} else {
				this._consumoInternoService.save(this.consumoInterno).subscribe(
					() => this.onSuccess('default', '¡Registrado correctamente!'),
					error => this.onError('default', '¡No se pudo registrar!', error)
				);
			}
		}
	}

	setDefaultData(consumoInterno: ConsumoInterno = null) {
		// console.log('consumo', consumoInterno);
		let fecha                           = moment().format('YYYY-MM-DD');
		// let currentUser                     = <Usuario>this._usuarioService.getStorage();
		this.consumoInterno.id              = (consumoInterno != null) ? consumoInterno.id                       : null;
		this.consumoInterno.empleado_id     = (consumoInterno != null) ? consumoInterno.empleado_id              : -1;
		this.consumoInterno.cantidad        = (consumoInterno != null) ? consumoInterno.cantidad                 : 1;
		this.consumoInterno.producto_id     = (consumoInterno != null) ? consumoInterno.producto_id              : -1;
		this.consumoInterno.producto_nombre = (consumoInterno != null) ? consumoInterno.producto.producto.nombre : '';
		this.consumoInterno.fecha           = (consumoInterno != null) ? consumoInterno.fecha                    : fecha;
		this.consumoInterno.created_at      = (consumoInterno != null) ? consumoInterno.created_at               : null;
		this.consumoInterno.updated_at      = (consumoInterno != null) ? consumoInterno.updated_at               : null;
		this.flags.edit                     = (consumoInterno != null) ? true                                    : false;
	}

	activarDataTable() {
		var table = $('#dtConsumosInternos').DataTable({
			ajax: {
				url: this._consumoInternoService.url,
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

		$('#dtConsumosInternos tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.flags.edit = true;
			self.setDefaultData(<ConsumoInterno>data);
		} );

		$('#dtConsumosInternos tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.flags.edit = true;
			self.setDefaultData(<ConsumoInterno>data);
			$('#modal-delete').modal('show');
		} );
	}

	onSelectProducto(event) {
		let producto = event.producto;

		if (producto.stock >= 1) {
			this.consumoInterno.producto_id = producto.id;
			this.consumoInterno.producto_nombre = producto.nombre;
			$('#modal-producto-consumo').modal('hide');
		} else {
			toastr.error('El producto no está en stock.');
		}
	}
	
	onSuccess(mode: string, alertMessage: string) {
		// form.markAsUntouched();
		$('#dtConsumosInternos').DataTable().ajax.reload();
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