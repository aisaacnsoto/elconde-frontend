import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-producto-list',
	templateUrl: './producto-list.component.html',
	styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

	productos: Producto[] = [];
	producto: Producto = null;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _productoService: ProductoService
	) { }

	ngOnInit(): void {
		this._route.data.subscribe(data => {
			this.productos = data['productos'];
		});
	}

	onSelect(event) {
		this.producto = event;
	}

	goToCreate() {
		this._router.navigate(['/productos/registrar']);
	}

	
	onDelete(event) {
		this.producto = event;
		$('#modal-delete').modal('show');
	}

	onDeleteSubmit() {
		this.showProcessingIndicator();
		this._productoService.delete(this.producto.id).subscribe(
			res => {
				toastr.success('¡Eliminado correctamente!');
				this.showProcessingIndicator(false);
				$('#modal-delete').modal('hide');
				this.removeItem();
			},
			err => {
				console.log(err);
				toastr.error('¡No se pudo eliminar!');
				this.showProcessingIndicator(false);
				$('#modal-delete').modal('hide');
			}
		);
	}

	removeItem() {
		let index = this.productos.indexOf(this.producto);
		this.productos.splice(index, 1);
	}
	
	showProcessingIndicator(processing: boolean = true) {
		let defaultTemplate = `
			<i class="fas fa-ban mr-1"></i>
			Eliminar
		`;
		let loadingTemplate = `
			<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
			Eliminando
		`;
		if (processing) {
			this.setButtonTemplate(loadingTemplate, true);
		} else {
			this.setButtonTemplate(defaultTemplate, false);
		}
	}

	setButtonTemplate(template: string, disabled: boolean) {
		let buttonRegister = <HTMLButtonElement>document.getElementById('buttonDelete');
		buttonRegister.innerHTML = template;
		buttonRegister.disabled = disabled;
	}
}
