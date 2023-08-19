import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../services/empleado.service';

@Injectable({
	providedIn: 'root'
})
export class EmpleadoIDResolveGuard implements Resolve<any> {
	
	constructor(
		private _empleadoService: EmpleadoService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._empleadoService.getById(+route.paramMap.get('id'));
		// console.log('ruta', route);
		// if (route.paramMap.get('id') != null) {
		// 	let id = ;
		// } else {
		// }
	}

}
