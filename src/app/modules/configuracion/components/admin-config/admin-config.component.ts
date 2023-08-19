import { Component, OnInit, ViewChild } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { Permiso } from 'src/app/models/permiso';
import { Empleado } from 'src/app/models/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-admin-config',
	templateUrl: './admin-config.component.html',
	styleUrls: ['./admin-config.component.css']
})
export class AdminConfigComponent implements OnInit {

	usuario: Usuario = {
		id: null,
		nombre_display: '',
		empleado: null,
		rol: null,
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

			if (data['admin'] != undefined) {
				this.edit = true;
				this.usuario = data['admin'];
			}
		});
		
	}

	onSubmit() {

		this.showProcessingIndicator();
		this._usuarioService.updateAdmin(this.usuario).subscribe(
			res => {
				// console.log(res);
				this._usuarioService.removeStorage();
				this._usuarioService.saveStorage(res);
				location.reload();
			},
			err => {
				console.log(err);
				toastr.error('¡No se pudo actualizar!');
				this.showProcessingIndicator(false);
			}
		);
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
