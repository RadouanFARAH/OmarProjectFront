import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-consommateur-demandehistorique',
  templateUrl: './consommateur-demandehistorique.page.html',
  styleUrls: ['./consommateur-demandehistorique.page.scss'],
})
export class ConsommateurDemandehistoriquePage implements OnInit {

  constructor(private paramServices: ParametresService, private navCtrl:NavController) {
    this.getMyOrders();
  }

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }
  data: any = [];
  getMyOrders() {
    this.paramServices.getHistoryOrdersConso().subscribe(result => {
      this.data = result;
      this.data.forEach(d => {
        d.datecommande = (d.datecommande).slice(0, 10)
      });
    })
  }

}
