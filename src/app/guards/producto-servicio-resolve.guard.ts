import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoServicioService } from '../services/producto.servicio.service';
import { ServicioService } from '../services/servicio.service';

@Injectable({
	providedIn: 'root'
})
export class ProductoServicioResolveGuard implements Resolve<any> {

	constructor(
		private _servicioService: ProductoServicioService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
		return this._servicioService.getAll();
	}

}
