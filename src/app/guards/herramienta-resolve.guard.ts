import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HerramientaService } from '../services/herramienta.service';

@Injectable({
	providedIn: 'root'
})
export class HerramientaResolveGuard implements Resolve<any> {
	
	constructor(
		private _herramientaService: HerramientaService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		if (route.paramMap.get('id') != null) {
			let id = +route.paramMap.get('id');
			return this._herramientaService.getById(id);
		} else {
			return this._herramientaService.getAll();
		}
	}

}
