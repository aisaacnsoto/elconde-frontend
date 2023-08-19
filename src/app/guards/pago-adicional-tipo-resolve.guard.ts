import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PagoAdicionalTipoService } from '../services/pago-adicional-tipo.service';

@Injectable({
	providedIn: 'root'
})
export class PagoAdicionalTipoResolveGuard implements Resolve<any> {
	
	constructor(
		private _pagoService: PagoAdicionalTipoService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._pagoService.getAll();
	}

}
