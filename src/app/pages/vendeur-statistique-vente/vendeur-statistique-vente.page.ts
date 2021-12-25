import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { VendeurStatisticsService } from 'src/app/services/vendeur-statistics.service';

@Component({
  selector: 'app-vendeur-statistique-vente',
  templateUrl: './vendeur-statistique-vente.page.html',
  styleUrls: ['./vendeur-statistique-vente.page.scss'],
})
export class VendeurStatistiqueVentePage implements OnInit {

  dataDay = []
  selectedSegment = "today";
  orders: any;
  prixtotal: number;
  pointtotal: number;
  dataDays: any[];
  constructor(private stats: VendeurStatisticsService, private storage: Storage) {

  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.segmentChanged()
  }
  segmentChanged() {
    let orders = [];
    let products = [];
    let productIDs = [];
    let prixtotal = 0
    let pointtotal = 0
    this.stats.getOrdersByDay({ today: this.selectedSegment == "today", yesterday: this.selectedSegment == "yesterday" }).subscribe((res: any) => {
      console.log(res.result);
      console.log(prixtotal);
      console.log(pointtotal);
      
      for (let i = 0; i < res.result.length; i++) {
        if (!orders.includes(res.result[i].codecommande)) {
          orders.push(res.result[i].codecommande)
        }
        if (this.selectedSegment == "today") {

          if (!productIDs.includes(res.result[i].idproduct)) {
            productIDs.push(res.result[i].idproduct)
            products.push(res.result[i])
          } else {
            let index = productIDs.indexOf(res.result[i].idproduct)
            products[index].quantite += res.result[i].quantite
          }
        }else if (this.selectedSegment == "yesterday") {

          if (!productIDs.includes(res.result[i].datecommande)) {
            productIDs.push(res.result[i].datecommande)
            res.result[i].point = res.result[i].point * res.result[i].quantite
            res.result[i].prixfinal = parseFloat((res.result[i].quantite * parseFloat(res.result[i].prixfinal)).toFixed(2))
            products.push(res.result[i])  
          } else {
            let index = productIDs.indexOf(res.result[i].datecommande)
            products[index].point += res.result[i].point * res.result[i].quantite
            products[index].prixfinal += parseFloat((res.result[i].quantite * parseFloat(res.result[i].prixfinal)).toFixed(2))
          }
        }else{

          if (!productIDs.includes(new Date(res.result[i].datecommande).toLocaleDateString('ar-EG-u-nu-latn',{month: 'long'}))) {

            productIDs.push(new Date(res.result[i].datecommande).toLocaleDateString('ar-EG-u-nu-latn',{month: 'long'}))
            res.result[i].point = res.result[i].point * res.result[i].quantite
            res.result[i].prixfinal = parseFloat((res.result[i].quantite * parseFloat(res.result[i].prixfinal)).toFixed(2))
            
            products.push(res.result[i])

          } else {

            let index = productIDs.indexOf(new Date(res.result[i].datecommande).toLocaleDateString('ar-EG-u-nu-latn',{month: 'long'}))
            products[index].point += res.result[i].point * res.result[i].quantite
            products[index].prixfinal = parseFloat((products[index].prixfinal+(res.result[i].quantite * parseFloat(res.result[i].prixfinal))).toFixed(2))
            
          
          }
        }
      }
      
      
      for (let i = 0; i < products.length; i++) {
        if (this.selectedSegment == "today") {
          prixtotal += products[i].quantite * parseFloat(products[i].prixfinal)
          pointtotal += products[i].quantite * products[i].point
        }else{
          prixtotal += products[i].prixfinal
          pointtotal += products[i].point
        }
      }

      this.dataDay = products
      this.dataDays = productIDs
      this.orders = orders.length      
      this.prixtotal = parseFloat(prixtotal.toFixed(2))
      this.pointtotal = parseFloat(pointtotal.toFixed(2))
    })
  }

}
