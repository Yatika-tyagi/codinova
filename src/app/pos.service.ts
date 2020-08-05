import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class posService {

  constructor(private http: HttpClient) { }

  getProducts() {

    return of([
      {
        "id":87654,
        "name": "Lenovo",
        "category": "Computer",
        "sku": "345678uisfdj",
        "price": 40000,
        "quantity": 100
      },
      {
        "id":8765,
        "name": "Dell",
        "category": "Computer",
        "sku": "345678uij",
        "price": 40000,
        "quantity": 130
      },
      {
        "id":87615,
        "name": "HP",
        "category": "Computer",
        "sku": "34s5678uij",
        "price": 40000,
        "quantity": 130
      },
      {
        "id":87654,
        "name": "Pizza",
        "category": "food",
        "sku": "098pizz",
        "price": 500,
        "quantity": 200
      },
      {
        "id":87651,
        "name": "Burger",
        "category": "food",
        "sku": "98uikm",
        "price": 300,
        "quantity": 400
      },
      {
        "id":87652,
        "name": "Jeans",
        "category": "clothing",
        "sku": "9ikj",
        "price": 2000,
        "quantity": 300
      },
      {
        "id":87650,
        "name": "Shirt",
        "category": "clothing",
        "sku": "9dikj",
        "price": 2000,
        "quantity": 300
      },
      {
        "id":876581,
        "name": "Kurta",
        "category": "clothing",
        "sku": "9ikjd",
        "price": 2000,
        "quantity": 300
      }
    ]);
  }

}
