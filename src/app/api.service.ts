import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url = 'https://api.github.com/orgs/microsoft/repos';
  constructor(private http: HttpClient,) {
  }

  repositories(): any{
    return this.http.get(this.url , {});
  }

}