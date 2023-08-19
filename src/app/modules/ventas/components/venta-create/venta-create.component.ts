import { Component, OnInit, ViewChild } from '@angular/core';

import { VentaService } from 'src/app/services/venta.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Venta } from 'src/app/models/venta';
import { Producto } from 'src/app/models/producto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';

import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaBuscarProductoComponent } from '../venta-buscar-producto/venta-buscar-producto.component';
import { RegistrarClienteComponent } from 'src/app/modules/shared/components/registrar-cliente.component';

declare var $;
declare var toastr;

@Component({
	selector: 'app-venta-create',
	templateUrl: './venta-create.component.html',
	styleUrls: ['./venta-create.component.css'],
	providers: [VentaService, ProductoService, ClienteService]
})
export class VentaCreateComponent implements OnInit {

	public currentUser: Usuario;
	public cajeros: Usuario[] = [];
	public venta: Venta = new Venta();
	public cliente: Cliente = new Cliente();
	public defaultCliente: Cliente;

	public table: any;

	public selectedProducto: Producto;

	public ticket: any;
	public return_to: string;
	public edit: boolean = false;

	@ViewChild(RegistrarClienteComponent)
	public nuevoClienteCmpnt: RegistrarClienteComponent;

	@ViewChild(VentaBuscarProductoComponent)
	public busquedaComponent: VentaBuscarProductoComponent;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _ventaService: VentaService,
		private _usuarioService: UsuarioService,
		private _clienteService: ClienteService
	) { }

	ngOnInit(): void {
		this.currentUser = <Usuario>this._usuarioService.getStorage();

		this._route.data.subscribe(data => {
			// console.log('cliente', data.cliente);
			if (data['cliente'] != undefined) {
				this.defaultCliente = data['cliente'];
				this.setDefaultDataVenta();
				this.setDefaultCliente();
			} else {
				this.setDefaultDataVenta();
				this.setDefaultDataCliente();
			}

			// console.log('venta', data.venta);
			if (data['venta'] != undefined) {
				this.venta = data['venta'];
				this.venta.detalles = data['venta'].detalles;
				this.cliente = data['venta'].get_cliente;
				this.edit = true;
				console.log(data['venta']);
			}

			if (data['cajeros'] != undefined) {
				this.cajeros = data['cajeros'];
			}
		});

		this.ticket = {};
	}

	setDefaultCliente() {
		this.venta.cliente = this.defaultCliente.id;
		this.cliente = this.defaultCliente;
	}

	onSubmit(form): void {
		let errores = 0;

		let lengthDetalle = this.venta.detalles.length;
		if (lengthDetalle == 0) {
			toastr.error('¡Agrega algún producto!');
			errores++;
		}

		if (errores > 0) return;

		this.loader('Register');

		if (this.edit) {

			this._ventaService.update(this.venta).subscribe(
				response => {
					this.loader('Register', false);
					toastr.success('¡Actualizado correctamente!');
					this._router.navigate(['/ventas/archivo']);
				},
				error => {
					console.log(error);
					this.loader('Register', false);
					toastr.error('¡No se pudo actualizar!');
				}
			);
		} else {
			this._ventaService.save(this.venta).subscribe(
				response => {
					this.setDefaultDataVenta();
					this.loader('Register', false);
					this.busquedaComponent.clear();
					toastr.success('¡Registrado correctamente!');
	
					this.imprimirTicket(response);
				},
				error => {
					console.log(error);
					this.loader('Register', false);
					toastr.error('¡No se pudo registrar!');
				}
			);
		}
	}

	loader(alias: string, showing = true) {
		let spinner = $('#spinner'+alias);
		let button = $('#button'+alias);

		if (showing) {
			spinner.show();
			button.attr('disabled', true).attr('cursor', 'pointer');
		} else {
			spinner.hide();
			button.attr('disabled', false).attr('cursor', 'default');
		}
	}

	onProductoSubmit(event = null): void {
		console.log(event);
		let cantidad = (event != null) ? event.cantidad : 1;
		let producto = (event != null) ? event.producto : this.selectedProducto;
		let precio = (event != null) ? event.precio : 0;
		let importe = cantidad * precio;

		if (producto.stock < 1) {
			toastr.error('¡El producto no está en stock!');
			return;
		}

		if (this.venta.detalles.find(item => item.producto == producto.id) != null) {
			toastr.warning('¡El producto ya está agregado!');
			return;
		}

		let tmpDetalle = {
			cantidad: cantidad,
			get_producto: {
				producto: producto,
				unidad_medida: {
					unidad: producto.unidad_medida
				}
			},
			producto: producto.id,
			precio: precio,
			importe: importe
		}

		this.venta.detalles.push(tmpDetalle);
		this.calcularTotal();
	}

	setDefaultDataVenta() {
		let fecha                   = moment().format('YYYY-MM-DD');

		this.venta.id               = null;
		this.venta.fecha            = fecha;
		this.venta.tipo_comprobante = '';
		this.venta.nro_comprobante  = '';
		this.venta.promocion        = null;
		this.venta.cliente          = this.defaultCliente.id;
		this.venta.total            = 0;
		this.venta.tipo_venta       = 'EFECTIVO';
		this.venta.created_by       = this.currentUser.id;
		this.venta.created_at       = '';
		this.venta.updated_at       = '';
		this.venta.detalles         = [];
	}

	setDefaultDataCliente(cliente: Cliente = null) {
		let fecha                = moment().format('YYYY-MM-DD');

		this.cliente.id          = (cliente != null) ? cliente.id          : 0;
		this.cliente.nombres     = (cliente != null) ? cliente.nombres     : '';
		this.cliente.apellidos   = (cliente != null) ? cliente.apellidos   : '';
		this.cliente.num_doc     = (cliente != null) ? cliente.num_doc     : '';
		this.cliente.tipo_doc    = (cliente != null) ? cliente.tipo_doc    : 'DNI';
		this.cliente.telefono    = (cliente != null) ? cliente.telefono    : '';
		this.cliente.fecha_nac   = (cliente != null) ? cliente.fecha_nac   : fecha;
		this.cliente.direccion   = (cliente != null) ? cliente.direccion   : '';
		this.cliente.correo      = (cliente != null) ? cliente.correo      : '';
		this.cliente.descripcion = (cliente != null) ? cliente.descripcion : '';
		this.cliente.activo      = (cliente != null) ? cliente.activo      : 1;
		this.cliente.created_at  = (cliente != null) ? cliente.created_at  : null;
		this.cliente.updated_at  = (cliente != null) ? cliente.updated_at  : null;
	}

	nuevoCliente() {
		this.nuevoClienteCmpnt.openModalCliente();
	}

	onRegisterCliente($event) {
		this.setDefaultDataCliente($event);
	}

	onCantidadChange(index) {
		let detalle = this.venta.detalles[index];
		detalle.importe = +detalle.cantidad * +detalle.precio;
		this.calcularTotal();
	}

	onRemoveDetalle(index) {
		this.venta.detalles.splice(index, 1);
		this.calcularTotal();
	}

	calcularTotal() {
		let total: number = 0;

		this.venta.detalles.forEach(item => {
			total += +item.importe;
		});
		this.venta.total = total;
	}

	buscarCliente(event) {
		this.venta.cliente = event.id;
		$('#display_cliente').val(event.nombres+' '+event.apellidos);
		$('#modal-buscar-cliente').modal('hide');
		// console.log('resultado',this.venta.cliente);
	}

	getProduct(event) {
		console.log('componente registrar venta', event);
	}

	imprimirTicket(res = null) {
		
		if (res != null) this.ticket = res;

		$('#ticketVenta').printThis({
			importCSS: true,
			importStyle: true,
			loadCSS: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
		});
	}

}
