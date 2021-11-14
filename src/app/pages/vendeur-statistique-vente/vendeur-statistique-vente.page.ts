import { Component, OnInit } from '@angular/core';
import { VendeurStatisticsService } from 'src/app/services/vendeur-statistics.service';

@Component({
  selector: 'app-vendeur-statistique-vente',
  templateUrl: './vendeur-statistique-vente.page.html',
  styleUrls: ['./vendeur-statistique-vente.page.scss'],
})
export class VendeurStatistiqueVentePage implements OnInit {

  dataDay = []
  sommeDataDay = {
    qtes: 2300,
    nbrFacture: 450,
    notes: 1040,
    prixs: (25511.40).toFixed(2)
  }

  dataDays = [
    { date: "2021-08-19", qte: 1850, note: 410, prix: (11100.60).toFixed(2) },
    { date: "2021-08-20", qte: 1470, note: 380, prix: (10220.60).toFixed(2) },
    { date: "2021-08-21", qte: 3453, note: 930, prix: (24105.60).toFixed(2) },
    { date: "2021-08-22", qte: 2320, note: 720, prix: (18500.60).toFixed(2) }
  ];
  sommeDataMount = {
    qtes: 9093,
    nbrFacture: 480,
    notes: 2440,
    prixs: (63927.4).toFixed(2)
  }

  dataMounts = [
    { date: "2021-04", facture: 1850, note: 122680, prix: (14430).toFixed(2) },
    { date: "2021-05", facture: 1470, note: 56290, prix: (23340).toFixed(2) },
    { date: "2021-06", facture: 3453, note: 43550, prix: (18903).toFixed(2) },
    { date: "2021-07", facture: 2320, note: 23572, prix: (20352).toFixed(2) }
  ];

  selectedSegment = "today";
  orders: any;
  prixtotal: number;
  pointtotal: number;

  constructor(private stats:VendeurStatisticsService) { 
    let orders = [];
    let prixtotal=0
    let pointtotal=0
    this.stats.getOrdersByDay({today:this.selectedSegment=="today", yesterday:this.selectedSegment=="yesterday"}).subscribe((res:any)=>{
      console.log(res);
      this.dataDay = res
      for (let i = 0 ; i <res.length; i++){
        console.log(orders,res[i].codecommande);
        if (!orders.includes(res[i].codecommande)){
          orders.push(res[i].codecommande)
          prixtotal +=res[i].prixtotal
          pointtotal +=res[i].pointtotal
        }
      }
      console.log(orders);
      this.orders = orders.length
      console.log(this.orders);
      this.prixtotal = prixtotal
      this.pointtotal = pointtotal
    })
  }

  ngOnInit() {
  }

  segmentChanged(){
    console.log("segment changed");
    let orders = [];
    let products = [];
    let productIDs = [];
    let prixtotal=0
    let pointtotal=0
    this.stats.getOrdersByDay({today:this.selectedSegment=="today", yesterday:this.selectedSegment=="yesterday"}).subscribe((res:any)=>{
      console.log(res);
      
      for (let i = 0 ; i <res.length; i++){
        console.log(orders,res[i].codecommande);
        if (!productIDs.includes(res[i].idproduct)){
          productIDs.push(res[i].idproduct)
          products.push(res[i])
        }else{
          let index = productIDs.indexOf(res[i].idproduct)
          products[index].quantite += res[i].quantite
        }
        if (!orders.includes(res[i].codecommande)){
          orders.push(res[i].codecommande)
          prixtotal +=res[i].prixtotal
          pointtotal +=res[i].pointtotal
        }
      }
      this.dataDay = products
      console.log(orders);
      this.orders = orders.length
      console.log(this.orders);
      this.prixtotal = prixtotal
      this.pointtotal = pointtotal
    })
  }

}
