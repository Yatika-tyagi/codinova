import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class posService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('http://localhost:3004/product');
  }

  addProduct(data) {
    return this.http.post('http://localhost:3004/product',data);
  }
}
