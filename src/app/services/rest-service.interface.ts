import { Observable } from 'rxjs';

export interface RestService {
    getAll(): Observable<any>;
    getById(id: number): Observable<any>;
    save(model: object): Observable<any>;
    update(model: object): Observable<any>;
    delete(id: number): Observable<any>;
}