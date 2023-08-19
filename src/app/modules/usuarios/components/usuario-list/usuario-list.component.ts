import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Global } from 'src/app/utils/global';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-usuario-list',
	templateUrl: './usuario-list.component.html',
	styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

	usuario: Usuario = null;

	constructor(
		private _usuarioService: UsuarioService,
		private _router: Router
	) { }

	ngOnInit() {
		this.activarDataTable();
	}

	activarDataTable() {
		var table = $('#dtUsuarios').DataTable({
			ajax: {
				url: this._usuarioService.url,
				dataSrc: ''
			},
			columns: [
				{data: null, render: (data, type, full, meta) => meta.row + 1},
				{data: 'nombre_display'},
				{data: null, render: (data, type, full, meta) => data.get_empleado != null ? data.get_empleado.nombres+' '+data.get_empleado.ape_paterno+' '+data.get_empleado.ape_materno : ''},
				{data: null, render: (data, type, full, meta) => data.get_rol != null ? data.get_rol.nombre : ''},
				{data: 'username'},
				{data: 'password'},
				{data: null, render: (data, type, full, meta) => data.activo == 1 ? 'Activo' : 'Inactivo' },
				{defaultContent: `
					<div class="btn-group" role="group">
						<button type="button" class="btn btn-info">
							<i class="fas fa-edit"></i>
						</button>
						<button type="button" class="btn btn-danger">
							<i class="fas fa-trash-alt"></i>
						</button>
					</div>
				`},
			],
			language: Global.dt.language,
			autoWidth: false,
			dom: 'Bfrtpil',
			buttons: [
				Global.dt.excel,
				Global.dt.print,
			]
		});

		let self = this;

		$('#dtUsuarios tbody').on( 'click', 'button.btn-info', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self._router.navigate(['/usuarios/editar/'+data.id]);
			$('#modal-register').modal('show');
		} );

		$('#dtUsuarios tbody').on( 'click', 'button.btn-danger', function() {
			var data: any = table.row( $(this).parents('tr') ).data();
			self.usuario = data;
			$('#modal-delete').modal('show');
		} );
	}

	goToCreate() {
		this._router.navigate(['/usuarios/registrar']);
	}

	onDelete() {
		this.showProcessingIndicator();
		this._usuarioService.delete(this.usuario.id).subscribe(
			res => {
				$('#dtUsuarios').DataTable().ajax.reload();
				toastr.success('¡Eliminado correctamente!');
				this.showProcessingIndicator(false);
				$('#modal-delete').modal('hide');
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
