import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-empleados-create',
	templateUrl: './empleados-create.component.html',
	styleUrls: ['./empleados-create.component.css'],
	providers: [EmpleadoService]
})
export class EmpleadosCreateComponent implements OnInit {

	empleado: Empleado;
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _empleadoService: EmpleadoService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;
		this.empleado = new Empleado();

		this._route.data.subscribe(data => {

			if (data['empleado'] != undefined) {
				this.setDefaultData(data['empleado']);
			} else {
				this.setDefaultData();
			}
		});
		
	}

	setDefaultData(empleado: Empleado = null) {
		let fecha = moment().format('YYYY-MM-DD');

		this.empleado.id                    = (empleado != null) ? empleado.id                    : null;
		this.empleado.codigo                = (empleado != null) ? empleado.codigo                : '';
		this.empleado.ape_paterno           = (empleado != null) ? empleado.ape_paterno           : '';
		this.empleado.ape_materno           = (empleado != null) ? empleado.ape_materno           : '';
		this.empleado.nombres               = (empleado != null) ? empleado.nombres               : '';
		this.empleado.num_doc               = (empleado != null) ? empleado.num_doc               : '';
		this.empleado.tipo_doc              = (empleado != null) ? empleado.tipo_doc              : 'DNI';
		this.empleado.telefono              = (empleado != null) ? empleado.telefono              : '';
		this.empleado.sexo                  = (empleado != null) ? empleado.sexo                  : 'MASCULINO';
		this.empleado.fecha_nac             = (empleado != null) ? empleado.fecha_nac             : fecha;
		this.empleado.direccion             = (empleado != null) ? empleado.direccion             : '';
		this.empleado.correo                = (empleado != null) ? empleado.correo                : '';
		this.empleado.fecha_ingreso_laboral = (empleado != null) ? empleado.fecha_ingreso_laboral : fecha;
		this.empleado.cargo                 = (empleado != null) ? empleado.cargo                 : 1;
		this.empleado.foto                  = (empleado != null) ? empleado.foto                  : '';
		this.empleado.activo                = (empleado != null) ? empleado.activo                : 1;
		this.empleado.created_at            = (empleado != null) ? empleado.created_at            : null;
		this.empleado.updated_at            = (empleado != null) ? empleado.updated_at            : null;
		this.edit                           = (empleado != null) ? true                           : false;
	}

	onSubmit() {
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._empleadoService.update(this.empleado).subscribe(
				res => this.onSuccess('¡Actualizado correctamente!'),
				err => this.onError('¡No se pudo actualizar!', err)
			);

		} else {

			this._empleadoService.save(this.empleado).subscribe(
				res => this.onSuccess('Registrado correctamente!'),
				err => this.onError('¡No se pudo registrar!', err)
			);

		}
	}

	onSuccess(alertMessage: string) {
		this.showProcessingIndicator(false);
		toastr.success(alertMessage);
		this._router.navigate(['/empleados']);
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
