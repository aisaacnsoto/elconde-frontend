import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
	selector: 'app-producto-filter',
	templateUrl: './producto-filter.component.html',
	styleUrls: ['./producto-filter.component.css']
})
export class ProductoFilterComponent implements OnInit {

	@Input() productos: Producto[];
	@Output() selected: EventEmitter<Producto>;
	@Output() delete: EventEmitter<Producto>;
	filteredProductos: Producto[];
	filtered: boolean = false;

	private _searchTerm: string;

	get searchTerm(): string {
		return this._searchTerm;
	}

	set searchTerm(value: string)  {
		this._searchTerm = value;
		this.filteredProductos = this.filterProductos(value);
	}

	filterProductos(searchString: string) {
		if (searchString.length == 0) this.filtered = false; else this.filtered = true;

		return this.productos.filter(producto => {
			let nombreMatches = producto.nombre.toLowerCase().indexOf(searchString.toLowerCase()) != -1;

			let codigos = producto.presentaciones.filter(presentacion => {
				let matches = presentacion.bar_codes.filter(bar_code =>
					bar_code.codigo.toLowerCase().indexOf(searchString.toLowerCase()) != -1);
				return matches.length > 0;
			});
			// let codigos = producto.bar_codes.filter(bar_code =>
			// 	bar_code.codigo.toLowerCase().indexOf(searchString.toLowerCase()) != -1);

			return nombreMatches || codigos.length > 0;
		});
	}

	constructor() {
		this.selected = new EventEmitter<Producto>();
		this.delete = new EventEmitter<Producto>();
	}

	ngOnInit(): void {
		this.filteredProductos = this.productos;
	}

	onSelected(event) {
		this.selected.emit(event);
	}

	onDelete(event) {
		this.delete.emit(event);
	}

}
