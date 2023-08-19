import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CitaService } from '../services/cita.service';
import { DashboardService } from '../services/dashboard.service';

import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class DashboardResolveGuard implements Resolve<any> {
	
	constructor(
		private _dashboardService: DashboardService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._dashboardService.admin(moment().format('YYYY-MM-DD'));
	}

}
