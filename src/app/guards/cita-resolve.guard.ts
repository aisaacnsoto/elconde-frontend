import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CitaService } from '../services/cita.service';

@Injectable({
	providedIn: 'root'
})
export class CitaResolveGuard implements Resolve<any> {
	
	constructor(
		private _citaService: CitaService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		let id = route.paramMap.get('id');
		if (id != null) {
			return this._citaService.getById(+id);
		} else {
			return this._citaService.getAll();
		}
	}

}
