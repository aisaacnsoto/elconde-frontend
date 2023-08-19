import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/models/cita';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var toastr: any;
declare var $: any;

@Component({
	selector: 'app-cita-detalle',
	templateUrl: './cita-detalle.component.html',
	styleUrls: ['./cita-detalle.component.css'],
	providers: [UsuarioService]
})
export class CitaDetalleComponent implements OnInit {

	public user: Usuario = new Usuario();
	public cita: Cita = new Cita();
	public updating: boolean = false;
	public enProcesoRestriction: boolean = false;
	public atentidoRestriction: boolean = false;

	onEventClick(arg) {
		this.cita = arg.event.extendedProps.cita;

		if (this.cita.estado == 'ATENDIDO') {
			this.atentidoRestriction = true;
		} else {
			this.atentidoRestriction = false;
		}
		
	}

	constructor(
		private _usuarioService: UsuarioService,
		private _citaService: CitaService,
		private _router: Router,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.user = <Usuario>this._usuarioService.getStorage();
		
		this._route.data.subscribe(data => {
			// this.setData(data.cita);
			this.cita = data['cita'];
			
			this.atentidoRestriction = (this.cita.estado == 'ATENDIDO') ? true : false;
			this.enProcesoRestriction = (this.cita.estado == 'EN PROCESO') ? true : false;
			// if (this.cita.estado == 'ATENDIDO') {
			// } else {
			// 	this.atentidoRestriction = false;
			// }
		});

	}

	setData(cita: Cita = null) {
		this.cita.id              = (cita != null) ? cita.id              : 0;
		this.cita.codigo          = (cita != null) ? cita.codigo          : '';
		this.cita.cliente         = (cita != null) ? cita.cliente         : 0;
		this.cita.empleado        = (cita != null) ? cita.empleado        : 0;
		this.cita.get_cliente     = (cita != null) ? cita.get_cliente     : { nombres : '', apellidos : '' };
		this.cita.get_empleado    = (cita != null) ? cita.get_empleado    : { nombres : '', ape_paterno : '', ape_materno : '' };
		this.cita.fecha           = (cita != null) ? cita.fecha           : '';
		this.cita.hora            = (cita != null) ? cita.hora            : '';
		this.cita.estado          = (cita != null) ? cita.estado          : '';
		this.cita.promocion       = (cita != null) ? cita.promocion       : 0;
		this.cita.metodo_pago     = (cita != null) ? cita.metodo_pago     : 'EFECTIVO';
		this.cita.total           = (cita != null) ? cita.total           : 0;
		this.cita.created_by      = (cita != null) ? cita.created_by      : 0;
		this.cita.created_at      = (cita != null) ? cita.created_at      : '';
		this.cita.updated_at      = (cita != null) ? cita.updated_at      : '';
		this.cita.get_detalles    = (cita != null) ? cita.get_detalles    : [];
		this.cita.tiempo_promedio = (cita != null) ? cita.tiempo_promedio : 0;
	}

	onCitaSubmit() {
		this.updating = true;
		this._citaService.updateEstado(this.cita).subscribe(
			res => {
				console.log(res);
				this.updating = false;
				toastr.success('¡Actualizado correctamente!');
				this._router.navigate(['/citas']);
			},
			err =>{
				console.log(err);
				this.updating = false;
				toastr.error('¡Algo salió mal!');
			}
		);
	}

	goToEdit() {
		this._router.navigate(['/citas/editar/'+this.cita.id]);
	}

	delete() { console.log('eliminar cita',this.cita.id); $('#modal-delete').modal('show'); }

	onDelete() {
		this.showProcessingIndicator();
		this._citaService.delete(this.cita.id).subscribe(
			res => {
				toastr.success('¡Eliminado correctamente!');
				this.showProcessingIndicator(false);
				$('#modal-delete').modal('hide');

				this._router.navigate(['/citas']);
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