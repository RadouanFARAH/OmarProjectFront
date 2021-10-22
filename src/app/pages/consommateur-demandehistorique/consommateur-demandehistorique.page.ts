import { Component, OnInit } from '@angular/core';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-consommateur-demandehistorique',
  templateUrl: './consommateur-demandehistorique.page.html',
  styleUrls: ['./consommateur-demandehistorique.page.scss'],
})
export class ConsommateurDemandehistoriquePage implements OnInit {

  constructor(private paramServices: ParametresService) {
    this.getMyOrders();
  }

  ngOnInit() {
  }

  data: any = [];
  getMyOrders() {
    this.paramServices.getHistoryOrdersConso().subscribe(result => {
      // console.log("My Orders____ : ", result);
      this.data = result;
      this.data.forEach(d => {
        d.datecommande = (d.datecommande).slice(0, 10)
      });
    })
  }

}
