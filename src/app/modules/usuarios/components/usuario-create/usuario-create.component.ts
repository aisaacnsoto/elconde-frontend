import { Component, OnInit, ViewChild } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { Permiso } from 'src/app/models/permiso';
import { Empleado } from 'src/app/models/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var $: any;

@Component({
	selector: 'app-usuario-create',
	templateUrl: './usuario-create.component.html',
	styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

	roles: Rol[] = [];
	permisos: Permiso[] = [];
	empleados: Empleado[] = [];
	usuario: Usuario = {
		id: null,
		nombre_display: '',
		empleado: -1,
		rol: -1,
		username: '',
		password: '',
		activo: 1,
		created_at: null,
		updated_at: null,
		permisos: [],
	};
	edit: boolean = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _usuarioService: UsuarioService
	) { }

	ngOnInit(): void {
		// document.getElementsByClassName('content-wrapper').item(0).scrollTop = 100;

		this._route.data.subscribe(data => {
			this.permisos = data['permisos'];
			this.empleados = data['empleados'];
			this.roles = data['roles'];

			if (data['usuario'] != undefined) {
				this.edit = true;
				this.usuario = data['usuario'];
				this.usuario.permisos.forEach(item => {
					let permisoObject = this.permisos.find(permiso => permiso.id == item.id);
					permisoObject.granted = true;
				});
			}
		});
		
	}

	onSubmit() {
		let checkedPermisos = [];
		$('input[type="checkbox"]:checked').each((i, el) => {
			checkedPermisos.push(+el.id.substr(7, 2));
		});
		this.usuario.permisos = checkedPermisos;
		
		this.showProcessingIndicator();
		if (this.edit) {
			
			this._usuarioService.update(this.usuario).subscribe(
				res => {
					// console.log(res);
					this._router.navigate(['/usuarios']);
				},
				err => {
					console.log(err);
					this.showProcessingIndicator(false);
				}
			);

		} else {

			this._usuarioService.save(this.usuario).subscribe(
				res => {
					// console.log(res);
					this._router.navigate(['/usuarios']);
				},
				err => {
					console.log(err);
					this.showProcessingIndicator(false);
				}
			);

		}
	}

	showProcessingIndicator(processing: boolean = true) {
		let buttonRegister = <HTMLButtonElement>document.getElementById('buttonRegister');
		if (processing) {
			buttonRegister.innerHTML = `
				<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
				Guardando
			`;
			buttonRegister.disabled = true;
		} else {
			buttonRegister.innerHTML = `
				<i class="fas fa-check mr-1"></i>
				Guardar
			`;
			buttonRegister.disabled = false;
		}
	}
}
