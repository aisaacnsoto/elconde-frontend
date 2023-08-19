import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
	selector: 'app-producto-tile',
	templateUrl: './producto-tile.component.html',
	styleUrls: ['./producto-tile.component.css']
})
export class ProductoTileComponent implements OnInit {

	@Input() producto: Producto;
	@Output() selected: EventEmitter<Producto>;
	@Output() delete: EventEmitter<Producto>;

	constructor() {
		this.selected = new EventEmitter<Producto>();
		this.delete = new EventEmitter<Producto>();
	}

	ngOnInit(): void { }

	onClick() {
		this.selected.emit(this.producto);
	}

	onDeleteClick() {
		this.delete.emit(this.producto);
	}

}
