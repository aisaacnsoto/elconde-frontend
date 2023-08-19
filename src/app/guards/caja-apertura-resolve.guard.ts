import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CajaAperturaService } from '../services/caja-apertura.service';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class CajaAperturaResolveGuard implements Resolve<any> {
	
	constructor(
		private _cajaAperturaService: CajaAperturaService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		let fecha = moment().format('YYYY-MM-DD');
		return this._cajaAperturaService.getByDate(fecha);
	}

}
