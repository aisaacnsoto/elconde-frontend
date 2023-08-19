import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [UsuarioService]
})
export class HomeComponent implements OnInit {

	constructor(
		private _usuarioService: UsuarioService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		// console.log('ruta home', _route);
		let currentUser: any = this._usuarioService.getStorage();

	}
	
	ngOnInit(): void {
	}
	
}
