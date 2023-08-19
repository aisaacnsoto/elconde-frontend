import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';

@Injectable()
export class ReporteService {
    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'reportes';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    cierreCaja(fecha): Observable<any> {
        return this._http.get(`${this.url}/cierre-caja/${fecha}`, {headers: this.headers});
    }

    pagoEmpleados(fecha): Observable<any> {
        return this._http.get(`${this.url}/pago-empleados/${fecha}`, {headers: this.headers});
    }
    
    ventas(fechaDesde, fechaHasta, metodoPago?, productoId?, servicioId?): Observable<any> {
        let endpoint = `${this.url}/ventas/${fechaDesde}/${fechaHasta}/${metodoPago}/${productoId}/${servicioId}`;

        // if (metodoPago != null && metodoPago != undefined) {
        //     endpoint += `/${metodoPago}`;
        // }
        return this._http.get(endpoint, {headers: this.headers});
    }
    
    citasAtendidas(clienteId, fechaDesde, fechaHasta): Observable<any> {
        let endpoint = `${this.url}/citas/${clienteId}/${fechaDesde}/${fechaHasta}`;
        return this._http.get(endpoint, {headers: this.headers});
    }
    
    rentabilidad(fechaDesde, fechaHasta): Observable<any> {
        let endpoint = `${this.url}/rentabilidad/${fechaDesde}/${fechaHasta}`;
        return this._http.get(endpoint, {headers: this.headers});
    }

    gastosMensual(mesDesde, mesHasta): Observable<any> {
        return this._http.get(`${this.url}/gastos/mensual/${mesDesde}/${mesHasta}`, {headers: this.headers});
    }

    consumosInternos(fechaDesde, fechaHasta): Observable<any> {
        return this._http.get(`${this.url}/consumos-internos/${fechaDesde}/${fechaHasta}`, {headers: this.headers});
    }

    resumenServiciosVentas(fecha): Observable<any> {
        return this._http.get(`${this.url}/resumen/${fecha}`, {headers: this.headers});
    }

    stock(): Observable<any> {
        return this._http.get(`${this.url}/stock`, {headers: this.headers});
    }

    gananciaNeta(fechaDesde, fechaHasta): Observable<any> {
        return this._http.get(`${this.url}/ganancia-neta/${fechaDesde}/${fechaHasta}`, {headers: this.headers});
    }
}