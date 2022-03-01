import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public url = 'https://api.github.com/orgs/microsoft/repos';

  constructor(private http: HttpClient) {}

  repositories(page: number, size: number, per_page: number): any {
    return this.http.get(
      `${this.url}?page=${page + 1}&size=${size}&per_page=${per_page}`,
      {}
    );
  }

  issues(name: string): any {
    return this.http.get(
      `https://api.github.com/repos/microsoft/${name}/issues?per_page=5`,
      {}
    );
  }
}
