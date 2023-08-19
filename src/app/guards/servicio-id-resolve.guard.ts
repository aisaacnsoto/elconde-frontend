import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioService } from '../services/servicio.service';

@Injectable({
	providedIn: 'root'
})
export class ServicioIdResolveGuard implements Resolve<any> {

	constructor(
		private _servicioService: ServicioService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
		return this._servicioService.getById(+route.paramMap.get('id'));
	}

}
