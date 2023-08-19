import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PagoLocalService } from '../services/pago-local.service';

@Injectable({
	providedIn: 'root'
})
export class PagoLocalResolveGuard implements Resolve<any> {
	
	constructor(
		private _pagoLocalService: PagoLocalService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		if (route.paramMap.get('id') != null) {
			let id = +route.paramMap.get('id');
			return this._pagoLocalService.getById(id);
		} else {
			return this._pagoLocalService.getAll();
		}
	}

}
