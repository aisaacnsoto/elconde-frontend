import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { RolService } from '../services/rol.service';

@Injectable({
	providedIn: 'root'
})
export class RolResolveGuard implements Resolve<any> {

	constructor(
		private _rolService: RolService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
		return this._rolService.getAll();
	}

}
