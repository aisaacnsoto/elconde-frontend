import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoCategoriaService } from '../services/producto-categoria.service';

@Injectable({
	providedIn: 'root'
})
export class ProductoCategoriaIDResolveGuard implements Resolve<any> {
	
	constructor(
		private _productoCategoriaService: ProductoCategoriaService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._productoCategoriaService.getById(+route.paramMap.get('id'));
		// let id = ;
		// if (id != null) {
		// } else {
		// }
	}

}
