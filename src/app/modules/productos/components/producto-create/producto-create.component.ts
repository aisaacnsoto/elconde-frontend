import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ProductoCategoria } from 'src/app/models/producto-categoria';
import { UnidadMedida } from 'src/app/models/unidad_medida';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-producto-create',
	templateUrl: './producto-create.component.html',
	styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {

	categorias: ProductoCategoria[] = []
	unidades_medida: UnidadMedida[] = []
	producto: Producto = {
		id: null,
		categoria: -1,
		nombre: '',
		precio: 0,
		stock: 0,
		activo: 1,
		unidad_medida: null,
		comision_barbero: 25,
		created_at: null,
		updated_at: null,
		bar_codes: []
	};
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _productoService: ProductoService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;

		this._route.data.subscribe(data => {
			this.categorias = data['categorias'];
			// this.unidades_medida = data.unidades_medida;

			if (data['producto'] != undefined) {
				this.edit = true;
				this.producto = data['producto'];
			}
		});
		
	}

	onCodigoSubmit() {
		let inputBarCode = $('#inputBarCode');
		let barCode = inputBarCode.val().trim();

		if (barCode.length > 0) {
			let index = this.producto.bar_codes.find(item => item.codigo == barCode);

			if (index == null) {
				this.producto.bar_codes.push({
					codigo: barCode
				});
			}
		}
		inputBarCode.val('');
		inputBarCode.focus();
	}

	onRemoveBarCode(index) {
		this.producto.bar_codes.splice(index, 1);
	}

	onSubmit() {
		// console.log(this.producto);
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._productoService.update(this.producto).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._productoService.save(this.producto).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/productos']);
	}

	onError(alertMessage: string, err: any) {
		console.log(err);
		this.showProcessingIndicator(false);
		toastr.error(alertMessage);
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
