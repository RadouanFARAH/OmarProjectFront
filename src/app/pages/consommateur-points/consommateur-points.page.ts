import { Component, OnInit } from '@angular/core';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-consommateur-points',
  templateUrl: './consommateur-points.page.html',
  styleUrls: ['./consommateur-points.page.scss'],
})
export class ConsommateurPointsPage implements OnInit {

  // data = [
  //   {
  //     numCommande: "C011020210001",
  //     date: "01-10-2021",
  //     point: 120
  //   },
  //   {
  //     numCommande: "C021020210048",
  //     date: "02-10-2021",
  //     point: 120
  //   },
  //   {
  //     numCommande: "C031020210051",
  //     date: "03-10-2021",
  //     point: 120
  //   },
  //   {
  //     numCommande: "C041020210083",
  //     date: "04-10-2021",
  //     point: 120
  //   },
  //   {
  //     numCommande: "C041020210083",
  //     date: "04-10-2021",
  //     point: 120
  //   },
  //   {
  //     numCommande: "C041020210083",
  //     date: "04-10-2021",
  //     point: 120
  //   },
  //   {
  //     numCommande: "C041020210083",
  //     date: "04-10-2021",
  //     point: 120
  //   },
  //   {
  //     numCommande: "C041020210083",
  //     date: "04-10-2021",
  //     point: 120
  //   },
  //   {
  //     numCommande: "C041020210083",
  //     date: "04-10-2021",
  //     point: 120
  //   },
  //   {
  //     numCommande: "C041020210083",
  //     date: "04-10-2021",
  //     point: 120
  //   }
  // ]
  constructor(private paramServices: ParametresService) {
    this.getMyOrders();
  }

  ngOnInit() {
  }

  data: any = [];
  pointSomme = 0;

  getMyOrders() {
    this.paramServices.getHistoryOrdersConso().subscribe(result => {
      // console.log("My Orders____ : ", result);
      this.data = result;
      this.data.forEach(d => {
        d.datecommande = (d.datecommande).slice(0, 10);
        this.pointSomme += d.pointtotal
      });
    })
  }

}
