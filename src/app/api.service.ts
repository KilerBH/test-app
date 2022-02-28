import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public url = 'https://api.github.com/orgs/microsoft/repos';

  constructor(private http: HttpClient) {}

  repositories(per_page: number): any {
    return this.http.get(`${this.url}?per_page=${per_page}`, {});
  }

  issues(name: string): any {
    return this.http.get(
      `https://api.github.com/repos/microsoft/${name}/issues?per_page=5`,
      {}
    );
  }
}
