import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  Url = environment.url+"/orders";
  cart_quantity = new BehaviorSubject(0)
  product_quantity = new BehaviorSubject(0)
  constructor(public http: HttpClient) { }

  myCart = [];
  calculate_quantity(){
    let qte = 0
    for (let i =0; i<this.myCart.length; i++){
      qte = qte + this.myCart[i].quantite
    }
    this.cart_quantity.next(qte)
  }
  get_product_quantity(productID){
    let qte = 0
    for (let i =0; i<this.myCart.length; i++){
      if (this.myCart[i].id == productID) qte = this.myCart[i].quantite
    }
    return qte
  }
  addProductToOrder(product) {
    this.myCart.push(product);
    this.calculate_quantity()
  }
  removeProductFromOrder(indice) {
    this.myCart.splice(indice, 1);
    this.calculate_quantity()
  }
  increaseOrderQuantity(indice){
    this.myCart[indice].quantite = this.myCart[indice].quantite + 1
    this.calculate_quantity()
  }
  decreaseOrderQuantity(indice){
    this.myCart[indice].quantite = this.myCart[indice].quantite - 1
    this.calculate_quantity()
  }

  sendOrder(order) {
    return this.http.post(this.Url + '/setOrdersConsommateur', order)
  }

}
