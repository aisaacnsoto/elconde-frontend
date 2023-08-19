import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable({
	providedIn: 'root'
})
export class ComisionResolveGuard implements Resolve<any> {
	
	constructor(
		private _globalService: GlobalService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._globalService.getComision();
	}

}
