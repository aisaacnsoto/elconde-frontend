import { Component, OnInit, NgZone } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

	public user;

	constructor(
		private _router: Router,
		private _usuarioService: UsuarioService
	) { }

	ngOnInit(): void {
		let currentUser = this._usuarioService.getStorage();
		if (currentUser != null){
			this.user = currentUser;
		}
	}

	logout() {
		this._usuarioService.removeStorage();
		location.reload();
	}

	goToConfig() {
		this._router.navigate(['/configuracion/admin']);
	}

}
