import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametresService {

  Url = environment.url;
  constructor(private storage: Storage, public http: HttpClient) { }
   getVendeur_dashboard(){
    return this.http.get(this.Url + "/vendeur_dashboard")
   }
   getconsovalide(){
    return this.http.get(this.Url + "/vendeur_dashboard/consoValide")
   }
   
   getconsoAttente(){
    return this.http.get(this.Url + "/vendeur_dashboard/consoAttente")
   }
   consoRefuse(){
    return this.http.get(this.Url + "/vendeur_dashboard/consoRefuse")
   }
   getConsoGlobalByQuartier(quartier){
    return this.http.post(this.Url + "/vendeur_dashboard/getConsoGlobalByQuartier", {idquartier:quartier})
   }
   getconsoGlobal(){
    return this.http.get(this.Url + "/vendeur_dashboard/getConsoGlobal")
   }
   sendMofitRejectOreder(data){
    return this.http.post(this.Url + "/vendeur_dashboard/sendMofitRejectOreder", data)
   }
  getCategories() {
    return this.http.get(this.Url + "/category" + "/getCategories")
  }
  getAllCategories() {
    return this.http.get(this.Url + "/category" + "/getAllCategories")
  }

  getProductByCategory(id) {
    return this.http.post(this.Url + "/product" + "/getProductByCategory", { id })
  }
  setProduct(data) {
    return this.http.post(this.Url + "/product" + "/putProduct", data)
  }
  setProductImage(formData){
    return this.http.post(this.Url + "/product" + "/putProductImage", formData)
  }

  getHistoryOrdersConso() {
    return this.http.get(this.Url + "/orders" + "/getOrdersConsommateur")
  }

  // for authentification
  async getToken() {
    return await this.storage.get('token');
  }


}
