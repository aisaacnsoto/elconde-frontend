import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../services/empleado.service';

@Injectable({
	providedIn: 'root'
})
export class EmpleadoBarberoResolveGuard implements Resolve<any> {
	
	constructor(
		private _empleadoService: EmpleadoService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		let cargoId = route.data['cargo'];
		
		return this._empleadoService.getByCargo(cargoId);
	}

}
