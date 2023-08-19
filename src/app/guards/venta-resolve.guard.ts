import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { VentaService } from '../services/venta.service';

@Injectable({
	providedIn: 'root'
})
export class VentaResolveGuard implements Resolve<any> {

	constructor(
		private _ventaService: VentaService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
		return this._ventaService.getById(route.paramMap.get('id'));
	}

}
