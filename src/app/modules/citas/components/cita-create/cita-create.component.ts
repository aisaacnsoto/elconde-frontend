import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/models/cita';
import { Servicio } from 'src/app/models/servicio';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Empleado } from 'src/app/models/empleado';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { RegistrarClienteComponent } from 'src/app/modules/shared/components/registrar-cliente.component';

declare var $;
declare var toastr;

@Component({
	selector: 'app-cita-create',
	templateUrl: './cita-create.component.html',
	styleUrls: ['./cita-create.component.css'],
	providers: [CitaService, ClienteService]
})
export class CitaCreateComponent implements OnInit {

	public usuario: Usuario;
	public cita: Cita = new Cita();
	public cliente: Cliente = new Cliente();
	public servicios: Array<Servicio>;
	public empleados: Array<Empleado>;

	public fila: Fila;
	public return_to: string;
	public edit: boolean = false;
	
	public showDsctRecom: boolean = false;
	public showDsctVIP: boolean = false;
	public showDsctCumple: boolean = false;
	public showDsctTraba: boolean = false;
	public showDsct: boolean = false;
	public labelDsct: string = '';

	public selectedService: Servicio;

	@ViewChild(RegistrarClienteComponent)
	public nuevoClienteCmpnt: RegistrarClienteComponent;

	constructor(
		private _citaService: CitaService,
		private _usuarioService: UsuarioService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit(): void {
		this._route.data.subscribe(data => {
			this.empleados = data['empleados'];
			this.servicios = data['servicios'];

			if (data['cita'] != undefined) {
				this.edit = true;

				this.cita = data['cita'];
				this.cita.detalles = this.cita.get_detalles;
				this.cliente = this.cita.get_cliente;

				this.cita.promocion = data['cita'].get_promocion;
				let promocion = this.cita.promocion;
				if (promocion != null) {
					if (promocion.id == 1) {
						this.showDsctRecom = true;
					} else if (promocion.id == 2) {
						this.showDsctVIP = true;
					} else if (promocion.id == 3) {
						this.showDsctCumple = true;
					} else if (promocion.id == 4) {
						this.showDsctTraba = true;
					} else {
						this.showDsct = true;
						this.labelDsct = promocion.nombre;
					}
				}

				this.calcularTotal();
			} else {
				this.setDefaultDataCita();
				this.setDefaultDataCliente();
			}
		});

		this._route.queryParams.subscribe( params => {
			this.return_to = ( params['return_to'] != undefined ) ? params['return_to'] : 'citas';
			if (params['fecha'] != undefined) {
				this.cita.fecha = params['fecha'];
			}
			if (params['hora'] != undefined) {
				this.cita.hora = params['hora'];
			}
		} );

		this.fila = new Fila();
		this.fila.cantidad = 1;

		$('#modal-buscar-cliente').on('shown.bs.modal', function(e) {
			$('#inputSearch').focus();
			$('#inputSearch').select();
		});

		this.usuario = <Usuario>this._usuarioService.getStorage()
	}

	onSubmit(): void {
		let errores = 0;

		let lengthDetalle = this.cita.detalles.length;
		if (lengthDetalle == 0) {
			toastr.error('¡Agrega algún servicio!');
			errores++;
		}

		if (errores > 0) return;

		$('#spinnerRegister').show();
		$('#buttonRegister').attr('disabled', true).attr('cursor', 'pointer');

		if (this.edit) {

			this._citaService.update(this.cita).subscribe(
				response => {
					console.log(response);
					$('#spinnerRegister').hide();
					$('#buttonRegister').attr('disabled', false).attr('cursor', 'default');
					toastr.success('¡Actualizado correctamente!');
					this._router.navigate([ '/citas/detalle/'+this.cita.id ]);
				},
				error => {
					console.log(error);
					$('#spinnerRegister').hide();
					$('#buttonRegister').attr('disabled', false).attr('cursor', 'default');
					toastr.error('¡No se pudo actualizar!');
				}
			);
			
		} else {

			this._citaService.save(this.cita).subscribe(
				response => {
					console.log(response);
					this.setDefaultDataCita();
					$('#spinnerRegister').hide();
					$('#buttonRegister').attr('disabled', false).attr('cursor', 'default');
					toastr.success('¡Registrado correctamente!');
					toastr.info('Se programó la cita a las '+response.hora);
					this._router.navigate([ '/citas' ]);
				},
				error => {
					console.log(error);
					$('#spinnerRegister').hide();
					$('#buttonRegister').attr('disabled', false).attr('cursor', 'default');
					toastr.error('¡No se pudo registrar!');
				}
				);

		}
	}
	
	onServicioSubmit(): void {
		let cantidad = this.fila.cantidad;
		let servicio = this.selectedService;

		if (isNaN(cantidad) || cantidad < 1) {
			toastr.error('¡Indique la cantidad!');
			return;
		}

		if (servicio == undefined || servicio == null) {
			toastr.error('¡Indique el servicio!');
			return;
		}

		let subtotal = cantidad * servicio.precio;
		let descuentoPrc = 0;
		let importe =  subtotal - (subtotal * (descuentoPrc / 100));

		let tmpDetalle = {
			cantidad: cantidad,
			servicio: servicio.id,
			precio: servicio.precio,
			descuento: descuentoPrc,
			importe: importe,
			get_servicio: servicio
		}

		this.cita.detalles.push(tmpDetalle);

		this.aplicarDescuentos();
		this.calcularTotal();
	}

	setDefaultDataCita() {
		let fecha                 = moment().format('YYYY-MM-DD');
		let hora                  = moment().format('HH:mm:ss');
		let currentUser           = <Usuario>this._usuarioService.getStorage();

		this.cita.id              = null;
		this.cita.codigo          = '';
		this.cita.cliente         = null;
		this.cita.empleado        = -1;
		this.cita.fecha           = fecha;
		this.cita.hora            = hora;
		this.cita.estado          = 'PENDIENTE';
		this.cita.promocion       = null;
		this.cita.total           = 0.0;
		this.cita.created_by      = currentUser.id;
		this.cita.created_at      = null;
		this.cita.updated_at      = null;
		this.cita.detalles        = [];
		this.cita.tiempo_promedio = 0;
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
		this.cita.cliente = $event.id;
		this.setDefaultDataCliente($event);

		this.showDsctRecom = false;
		this.showDsctVIP = false;
		this.showDsctCumple = false;
		this.showDsct = false;
		this.labelDsct = '';
		this.cita.promocion = null;

		let promocion = $event.promocion;
		if (promocion != null) {
			if (promocion.id == 1) {
				this.showDsctRecom = true;
			} else if (promocion.id == 2) {
				this.showDsctVIP = true;
			} else if (promocion.id == 3) {
				this.showDsctCumple = true;
			} else {
				this.showDsct = true;
				this.labelDsct = promocion.nombre;
			}
			this.cita.promocion = promocion;
		}

		this.aplicarDescuentos();
	}

	keyword = 'nombre';

	selectEvent(item) {
		this.selectedService = <Servicio>item;
	}
	
	onCantidadChange(index) {
		let detalle = this.cita.detalles[index];
		detalle.importe = +detalle.cantidad * +detalle.precio;

		this.onDescuentoChange(index);
		this.calcularTotal();
	}

	onServicioChange(e, index) {
		let servicio = this.servicios[e.target.selectedIndex];
		let detalle = this.cita.detalles[index];
		detalle.precio = +servicio.precio;
		detalle.importe = +detalle.cantidad * +detalle.precio;

		this.calcularTotal();
	}

	onPrecioChange(index) {
		let detalle = this.cita.detalles[index];
		detalle.importe = +detalle.cantidad * +detalle.precio;

		this.onDescuentoChange(index);
		this.calcularTotal();
	}

	onDescuentoChange(index) {
		let detalle = this.cita.detalles[index];
		detalle.importe = +detalle.cantidad * +detalle.precio
		detalle.importe -= +detalle.importe * (+detalle.descuento / 100);

		this.calcularTotal();
	}

	onRemoveDetalle(index) {
		this.cita.detalles.splice(index, 1);
		this.calcularTotal();
		console.log(this.cita.detalles);
	}

	calcularTotal() {
		let total: number = 0;
		let tiempo: number = 0;

		this.cita.detalles.forEach(item => {
			total += +item.importe;
			tiempo += +item.cantidad * +item.get_servicio.tiempo_promedio;
		});
		this.cita.total = total;
		this.cita.tiempo_promedio = tiempo;
	}

	buscarCliente(event) {
		this.cita.cliente = event.id;
		this.setDefaultDataCliente(event);

		this.showDsctRecom = false;
		this.showDsctVIP = false;
		this.showDsctCumple = false;
		this.showDsct = false;
		this.showDsctTraba = false;
		this.labelDsct = '';
		this.cita.promocion = null;

		let promocion = event.promocion;
		if (promocion != null) {
			if (promocion.id == 1) {
				this.showDsctRecom = true;
			} else if (promocion.id == 2) {
				this.showDsctVIP = true;
			} else if (promocion.id == 3) {
				this.showDsctCumple = true;
			} else if (promocion.id == 4) {
				this.showDsctTraba = true;
			} else {
				this.showDsct = true;
				this.labelDsct = promocion.nombre;
			}
			this.cita.promocion = promocion;
		}

		this.aplicarDescuentos();
		$('#modal-buscar-cliente').modal('hide');
		// console.log('resultado',this.cita.cliente);
	}

	aplicarDescuentos() {
		if (this.cita.promocion != null) {
			this.cita.detalles.forEach((item, index) => {
				// console.log('busqueda item', index);
				let servicio = this.cita.promocion.servicios.find(tmp => tmp.servicio.id == item.servicio);
				if (servicio != null) {
					this.cita.detalles[index].descuento = servicio.descuento;
					this.onDescuentoChange(index);
				}
			});
			// console.log(this.cita.detalles);
		} else {
			this.cita.detalles.forEach((item, index) => {
				item.descuento = 0;
				this.onDescuentoChange(index);
			});

		}
	}

	quitarDescuentos() {
		this.showDsctRecom = false;
		this.showDsctVIP = false;
		this.showDsctCumple = false;
		this.showDsctTraba = false;
		this.showDsct = false;
		this.labelDsct = '';
		this.cita.promocion = null;
		
		this.aplicarDescuentos();
	}

}

class Fila {
	public cantidad: number;
	public servicio: string;
	public p_unit: number;
	public subtotal: number;
	public promedio: number;
}
