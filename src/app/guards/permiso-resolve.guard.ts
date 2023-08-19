import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PermisoService } from '../services/permiso.service';

@Injectable({
	providedIn: 'root'
})
export class PermisoResolveGuard implements Resolve<any> {

	constructor(
		private _permisoService: PermisoService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
		return this._permisoService.getAll();
	}

}
