import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { UnidadMedida } from 'src/app/models/unidad_medida';
import { ProductoPresentacion } from 'src/app/models/producto-presentacion';
import { ProductoPresentacionService } from 'src/app/services/producto-presentacion.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-forma-presentacion-create',
	templateUrl: './forma-presentacion-create.component.html',
	styleUrls: ['./forma-presentacion-create.component.css']
})
export class FormaPresentacionCreateComponent implements OnInit, DoCheck {

	@Input() unidades_medida: UnidadMedida[] = [];
	presentacion: ProductoPresentacion = new ProductoPresentacion();
	edit: boolean = false;
	@Output('success') eventEmitter: EventEmitter<ProductoPresentacion> = new EventEmitter();

	constructor(
		private _presentacionService: ProductoPresentacionService
	) {
		$('#modal-presentacion').on('shown.bs.modal', function(e) {
			$('#unidad_medida').focus();
		});
	}

	ngDoCheck(): void {
		if (this.presentacion.costo > 0) {
			this.presentacion.margen_ganancia = (this.presentacion.precio_venta / this.presentacion.costo) - 1;
		} else {
			this.presentacion.margen_ganancia = 0;
		}
	}

	ngOnInit(): void {
		
	}

	setData(presentacion: ProductoPresentacion = null, producto_id?: number) {
		this.presentacion.id               = (presentacion != null) ? presentacion.id               : null;
		this.presentacion.producto_id      = (presentacion != null) ? presentacion.producto_id      : producto_id;
		this.presentacion.unidad_medida_id = (presentacion != null) ? presentacion.unidad_medida_id : -1;
		this.presentacion.costo            = (presentacion != null) ? presentacion.costo            : 0.0;
		this.presentacion.precio_venta     = (presentacion != null) ? presentacion.precio_venta     : 0.0;
		this.presentacion.margen_ganancia  = (presentacion != null) ? presentacion.margen_ganancia  : 0.0;
		this.presentacion.comision_barbero = (presentacion != null) ? presentacion.comision_barbero : 0.0;
		this.presentacion.stock            = (presentacion != null) ? presentacion.stock            : 0;
		this.presentacion.puede_vender     = (presentacion != null) ? presentacion.puede_vender     : 0;
		this.presentacion.puede_comprar    = (presentacion != null) ? presentacion.puede_comprar    : 0;
		this.presentacion.puede_asignar    = (presentacion != null) ? presentacion.puede_asignar    : 0;
		this.presentacion.puede_consumir   = (presentacion != null) ? presentacion.puede_consumir   : 0;
		this.presentacion.created_at       = (presentacion != null) ? presentacion.created_at       : null;
		this.presentacion.updated_at       = (presentacion != null) ? presentacion.updated_at       : null;
		this.presentacion.bar_codes        = (presentacion != null) ? presentacion.bar_codes        : [];

		this.edit                          = (presentacion != null) ? true                          : false;

		this.openModal();
	}

	openModal() {
		$('#modal-presentacion').modal('show');
	}
	
	closeModal() {
		$('#modal-presentacion').modal('hide');
	}

	onCodigoSubmit() {
		let inputBarCode = $('#inputBarCode');
		let barCode = inputBarCode.val().trim();

		if (barCode.length > 0) {
			let index = this.presentacion.bar_codes.find(item => item.codigo == barCode);

			if (index == null) {
				this.presentacion.bar_codes.push({
					codigo: barCode
				});
			}
		}
		inputBarCode.val('');
		inputBarCode.focus();
	}

	onRemoveBarCode(index) {
		this.presentacion.bar_codes.splice(index, 1);
	}

	onPresentacionFormSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._presentacionService.update(this.presentacion).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!', res),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._presentacionService.save(this.presentacion).subscribe(
				res => this.onSuccess('Registrado correctamente!', res),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string, res?: any) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this.closeModal();
		this.eventEmitter.emit(res);
	}

	onError(alertMessage: string, err?: any) {
		console.log(err);
		this.showProcessingIndicator(false);
		toastr.error(alertMessage);
		this.closeModal();
	}

	showProcessingIndicator(processing: boolean = true) {
		let defaultTemplate = `
			<i class="fas fa-check mr-1"></i>
			Guardar
		`;
		let loadingTemplate = `
			<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
			Guardando
		`;
		if (processing) {
			this.setButtonTemplate(loadingTemplate, true);
		} else {
			this.setButtonTemplate(defaultTemplate, false);
		}
	}

	setButtonTemplate(template: string, disabled: boolean) {
		let buttonRegister = <HTMLButtonElement>document.getElementById('buttonRegister');
		buttonRegister.innerHTML = template;
		buttonRegister.disabled = disabled;
	}

}
