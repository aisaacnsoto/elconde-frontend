import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../services/empleado.service';

@Injectable({
	providedIn: 'root'
})
export class EmpleadoResolveGuard implements Resolve<any> {
	
	constructor(
		private _empleadoService: EmpleadoService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._empleadoService.getAll();
		// console.log('ruta', route);
		// if (route.paramMap.get('id') != null) {
		// 	let id = +route.paramMap.get('id');
		// 	return this._empleadoService.getById(id);
		// } else {
		// }
	}

}
