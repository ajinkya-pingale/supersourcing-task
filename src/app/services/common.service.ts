import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
              private http:HttpClient) { }

  public baseUrl = 'https://jsonplaceholder.typicode.com'

  // @ts-ignore
  apiCall( type: string, url: string, body= {}, header = {} ) {
    url = this.baseUrl+url;
    //
    switch (type.toLowerCase()){
      case 'get': {
        return this.http.get(url, header).pipe(map(data => {

          return data
        }));
      }
      case 'post': {
        return this.http.post(url, body,header).pipe(map(data => {

          return data
        }));
      }
      case 'put': {
        return this.http.put(url, body);
      }
      case 'delete': {
        return this.http.delete(url);
      }
    }
  }

}
