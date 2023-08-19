import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
	providers: [UsuarioService]
})
export class SidebarComponent implements OnInit {

	public user;

	constructor(
		private _userService: UsuarioService
	) { }

	ngOnInit(): void {
		this.user = this._userService.getStorage();
	}

}
