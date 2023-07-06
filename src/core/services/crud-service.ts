import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators"
import { HttpClient } from '@angular/common/http';

export class crudService  {
    private _urlApi: string = '';
    private _http: HttpClient;

    get environment(): string { return environment.url }

    get http(): HttpClient {return this._http}
    get apiUrl(): string { return this._urlApi }
    


    constructor(urlApi: string, _http: HttpClient){
        this._urlApi = urlApi;
        this._http = _http;
    }

    getAll() {
        return this._http.get<any>(`${this.environment}/${this._urlApi}`);
    }

    getById(id: string) {
        return this._http.get<any>(`${this.environment}/${this._urlApi}/${id}`);
    }

    create<T>(data: T) {
        return this._http.post(`${this.environment}/${this._urlApi}`, data).pipe(
            map((result: any) => {
                return result;
            })
        );
    }

    edit<T>(data: T, id: string) {
        return this._http.put(`${this.environment}/${this._urlApi}/${id}`, data).pipe(
            map((result: any) => {
                return result;
            })
        );
    }

    delete(id: string) {
        return this._http.delete(`${this.environment}/${this._urlApi}/${id}`).pipe(
            map((result: any) => {
                return result;
            })
        );
    }
}