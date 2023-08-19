import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoCategoria } from 'src/app/models/producto-categoria';
import { ProductoCategoriaService } from 'src/app/services/producto-categoria.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-productos-categorias-create',
	templateUrl: './productos-categorias-create.component.html',
	styleUrls: ['./productos-categorias-create.component.css'],
	providers: [ProductoCategoriaService]
})
export class ProductosCategoriasCreateComponent implements OnInit {

	categoria: ProductoCategoria;
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _categoriaService: ProductoCategoriaService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;
		this.categoria = new ProductoCategoria();

		this._route.data.subscribe(data => {

			if (data['categoria'] != undefined) {
				this.setDefaultData(data['categoria']);
			} else {
				this.setDefaultData();
			}
		});
		
	}

	setDefaultData(categoria: ProductoCategoria = null) {

		this.categoria.id         = (categoria != null) ? categoria.id         : null;
		this.categoria.nombre     = (categoria != null) ? categoria.nombre     : '';
		this.categoria.created_at = (categoria != null) ? categoria.created_at : null;
		this.categoria.updated_at = (categoria != null) ? categoria.updated_at : null;
		this.edit                 = (categoria != null) ? true                 : false;
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._categoriaService.update(this.categoria).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._categoriaService.save(this.categoria).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/productos/categorias']);
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
