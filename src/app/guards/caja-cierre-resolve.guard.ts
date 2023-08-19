import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { CajaCierreService } from '../services/caja-cierre.service';

@Injectable({
	providedIn: 'root'
})
export class CajaCierreResolveGuard implements Resolve<any> {
	
	constructor(
		private _cajaCierreService: CajaCierreService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		let fecha = moment().format('YYYY-MM-DD');
		return this._cajaCierreService.getByDate(fecha);
	}

}
