import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUser(limit: number = 10): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4200/assets/data.json').pipe(
      map(values => values.splice(0, limit))
    );
  }
}
