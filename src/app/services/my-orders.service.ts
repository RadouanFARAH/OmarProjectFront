import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  Url = environment.url+"/orders";
  constructor(public http: HttpClient) { }

  myCart = [];
  getNumberProductInOrder() {
    return this.myCart.length;
  }
  addProductToOrder(product) {
    this.myCart.push(product);
  }
  removeProductFromOrder(indice) {
    // const index = this.myCart.indexOf();
    this.myCart.splice(indice, 1);
  }

  sendOrder(order) {
    return this.http.post(this.Url + '/setOrdersConsommateur', order)
  }

}
