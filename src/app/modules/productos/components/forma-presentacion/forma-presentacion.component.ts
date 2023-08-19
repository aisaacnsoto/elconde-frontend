import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoPresentacionService } from 'src/app/services/producto-presentacion.service';
import { Global } from 'src/app/utils/global';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoPresentacion } from 'src/app/models/producto-presentacion';
import { CurrencyPipe } from '@angular/common';
import { UnidadMedida } from 'src/app/models/unidad_medida';
import { FormaPresentacionCreateComponent } from '../forma-presentacion-create/forma-presentacion-create.component';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-forma-presentacion',
	templateUrl: './forma-presentacion.component.html',
	styleUrls: ['./forma-presentacion.component.css'],
	providers: [ProductoPresentacionService, CurrencyPipe]
})
export class FormaPresentacionComponent implements OnInit {

	producto: Producto;
	presentacion: ProductoPresentacion;
	unidades_medida: UnidadMedida[] = [];
	@ViewChild(FormaPresentacionCreateComponent)
	public presentacionCmpnt: FormaPresentacionCreateComponent;

	constructor(
		private _presentacionesService: ProductoPresentacionService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _currencyPipe: CurrencyPipe
	) { }

	ngOnInit() {
		this._route.data.subscribe(data => {
			this.producto = data['producto'];
			this.unidades_medida = data['unidades_medida'];
		});
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtPresentaciones').DataTable({
			ajax: {
				url: this._presentacionesService.url+'/'+this.producto.id,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'unidad_medida.unidad'},
				{data: null, render: (data, type, full, meta) => this._currencyPipe.transform(data.costo, 'S/ ')},
				{data: null, render: (data, type, full, meta) => this._currencyPipe.transform(data.precio_venta, 'S/ ')},
				{data: null, render: (data, type, full, meta) => data.margen_ganancia},
				{data: null, render: (data, type, full, meta) => data.comision_barbero},
				// {data: null, render: (data, type, full, meta) => data.stock > 0 ? '<div class="badge badge-success">'+data.stock+'</div>' : '<div class="badge badge-danger">'+data.stock+'</div>' },
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

		$('#dtPresentaciones tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.presentacionCmpnt.setData(<ProductoPresentacion> data);
		} );

		$('#dtPresentaciones tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.presentacion = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this.presentacionCmpnt.setData(null, this.producto.id);
	}

	onSuccess(event) {
		$('#dtPresentaciones').DataTable().ajax.reload();
	}

	onDelete() {
		this.showProcessingIndicator();
		this._presentacionesService.delete(this.presentacion.id).subscribe(
			res => {
				$('#dtPresentaciones').DataTable().ajax.reload();
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
