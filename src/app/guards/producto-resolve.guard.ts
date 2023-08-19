import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoService } from '../services/producto.service';

@Injectable({
	providedIn: 'root'
})
export class ProductoResolveGuard implements Resolve<any> {
	
	constructor(
		private _productoService: ProductoService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		if (route.paramMap.get('id') != null) {
			let id = +route.paramMap.get('id');
			return this._productoService.getById(id);
		} else {
			return this._productoService.getAll();
		}
	}

}
