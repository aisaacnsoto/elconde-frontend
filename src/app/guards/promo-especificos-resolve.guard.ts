import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PromocionService } from '../services/promocion.service';

@Injectable({
	providedIn: 'root'
})
export class PromoEspecificosResolveGuard implements Resolve<any> {

	constructor(
		private _promocionService: PromocionService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
		return this._promocionService.getEspecificos();
	}

}
