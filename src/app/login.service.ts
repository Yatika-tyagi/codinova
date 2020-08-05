import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loginService {

  constructor(private http: HttpClient) { }


  login(data) {
    return this.http.post('http://localhost:3004/user/login',data);
  }
}
