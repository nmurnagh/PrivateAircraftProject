import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataReader{
    baseUrl: string = '/src'
    
    constructor(private http: Http) { }
    
    getData() {
        return this.http.get(this.baseUrl + '/AirplaneDataCombined.json')
        .map((res: Response) => res.json()).catch(this.handleError);
    }
    
    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}