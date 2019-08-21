import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { App } from './app';

@Injectable()
export class AppService {
    appUrl = 'http://localhost:3000/users';

    constructor(private http: Http) {
        
    }

    getAllUsers(): Observable<App[]> {
        return this.http.get(this.appUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }

    createUser(user: App): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.appUrl, user, options)
        .map(success => success.status)
        .catch(this.handleError);
    }

    getUserById(userId: string): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.get(this.appUrl +"/"+ userId)
        .map(this.extractData)
        .catch(this.handleError);
    }

    updateUser(user: App): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.appUrl +"/"+user.id, user, options)
        .map(success => success.status)
        .catch(this.handleError);
    }

    deleteUser(userId: string): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.appUrl +"/"+ userId)
        .map(success => success.status)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}