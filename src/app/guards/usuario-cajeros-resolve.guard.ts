import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PermisoService } from '../services/permiso.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
	providedIn: 'root'
})
export class UsuarioCajerosResolveGuard implements Resolve<any> {

	constructor(
		private _usuarioService: UsuarioService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
		return this._usuarioService.getAll();
	}

}
