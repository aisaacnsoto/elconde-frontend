import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.css'],
	providers: [UsuarioService]
})
export class WelcomeComponent implements OnInit {

	constructor(
		private _usuarioService: UsuarioService,
		private _router: Router,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		let currentUser: any = this._usuarioService.getStorage();
		if (currentUser != null) {

			if (currentUser.rol == 1) {
				this._router.navigate(['/dashboard']);
			} else if (currentUser.rol == 2
				&& currentUser.permisos != undefined
				&& currentUser.permisos.indexOf(2) != -1) {
				this._router.navigate(['/citas']);
			}
		} else {
			this._router.navigate(['/login']);
		}
	}

}
