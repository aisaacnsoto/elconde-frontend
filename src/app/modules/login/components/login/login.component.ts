import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

declare var toastr;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

	public user = {
		username: 'admin',
		password: '@dm1n'
	};

	constructor(
		private spinner: NgxSpinnerService,
		private _usuarioService: UsuarioService,
		private _router: Router
	) { }
	
	ngOnInit(): void {
		let currentUser = this._usuarioService.getStorage();
		if (currentUser != null){
			this._router.navigate(['/']);
		}
	}

	onSubmit() {
		// console.log(this.user);
		this.spinner.show();
		this._usuarioService.login(this.user).subscribe(
			res => {
				if (res.message) {
					toastr.error(res.message);
					this.spinner.hide();
				} else {
					this._usuarioService.saveStorage(res)
					location.reload();
				}
			},
			err => {
				console.log(err);
				toastr.error('¡Algo salió mal!');
				this.spinner.hide();
			}
		);

	}
}
