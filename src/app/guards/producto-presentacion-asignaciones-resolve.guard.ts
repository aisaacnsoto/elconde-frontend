import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoService } from '../services/producto.service';
import { ProductoPresentacionService } from '../services/producto-presentacion.service';

@Injectable({
	providedIn: 'root'
})
export class ProductoPresentacionAsignacionesResolveGuard implements Resolve<any> {
	
	constructor(
		private _productoService: ProductoPresentacionService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._productoService.getProductosAsignaciones();
	}

}
