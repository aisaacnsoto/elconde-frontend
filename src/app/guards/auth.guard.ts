import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

	constructor(
		private _usuarioService: UsuarioService,
		private _router: Router
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.isLogged();
	}

	canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
		return this.isLogged() && this.hasAccess(route);
	}

	isLogged() {
		let user = this._usuarioService.getStorage();
		if (user != null) {
			// console.log('logueado');
			return true;
		} else {
			this._router.navigate(['/login']);
			return false;
		}
	}

	hasAccess(route: Route) {
		let granted = this.permissionGranted(route.path);
		// if (granted) console.log('permitido'); else console.log('restringido');

		return granted;
	}

	permissionGranted(module: string) {
		let granted = false;

		switch (module) {
			case 'dashboard': granted = this.chekPermissionArray(1);
				break;
			case 'citas': granted = this.chekPermissionArray(2);
				break;
			case 'ventas': granted = this.chekPermissionArray(3);
				break;
			case 'gastos': granted = this.chekPermissionArray(4);
				break;
			case 'caja': granted = this.chekPermissionArray(5);
				break;
			case 'clientes': granted = this.chekPermissionArray(6);
				break;
			case 'compras': granted = this.chekPermissionArray(7);
				break;
			case 'proveedores': granted = this.chekPermissionArray(8);
				break;
			case 'productos':
			case 'inventarios':
			case 'kardex': granted = this.chekPermissionArray(9);
				break;
			case 'servicios': granted = this.chekPermissionArray(10);
				break;
			case 'asignaciones': granted = this.chekPermissionArray(11);
				break;
			case 'reportes': granted = this.chekPermissionArray(12);
				break;
			case 'configuracion': granted = this.chekPermissionArray(13);
				break;
			default: granted = true;
		}

		return granted;
	}

	chekPermissionArray(module_id: number) {
		let module_exists = false;

		let user: any = this._usuarioService.getStorage();

		if (user != null) {
			if (user.rol == 1) return true;

			if (user.permisos != undefined && user.permisos.length > 0) {
				module_exists = user.permisos.indexOf(module_id) != -1;

				
				if (!module_exists) this._router.navigate(['/acceso-denegado']);
			} else {
				this._usuarioService.removeStorage();
				this._router.navigate(['/login']);
			}
		}
		return module_exists;
	}
}
