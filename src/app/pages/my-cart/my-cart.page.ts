import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MyOrdersService } from 'src/app/services/my-orders.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  // data = [
  //   {
  //     img: "../../../assets/images/product/prod2.jpg",
  //     nomProduit: "شاي لوبان الأخضر",
  //     qte: 20,
  //     prixUnitaire: 22.50,
  //     point: 3
  //   }
  // ]

  data: any;
  total: number = 0;
  showSuccessAlerte: boolean = false;
  showErrorAlerte: boolean = false;
  id: any;
  totalPoints: number = 0;
  totalPrice: number = 0;

  constructor(private ref: ChangeDetectorRef, public alertIonic: AlertController, private orderService: MyOrdersService, private activeRouter: ActivatedRoute) {
    console.log("hiiiiiiiiiii");
    this.data = this.orderService.myCart;

    this.activeRouter.params.subscribe((params) => {
      this.id = params.id
    })
  }

  ngOnInit() { }


  ionViewWillEnter() {
    for (let i = 0; i < this.data.length; i++) {
      console.log('nnnnnnn', i);
      this.totalPoints += this.data[i].point * this.data[i].quantite;
      this.totalPrice += this.data[i].prixfinal * this.data[i].quantite;
      console.log('fffffffffffff', this.totalPoints, this.totalPrice);
    }
  }

  minusQty(index) {
    if (this.data[index].quantite > 1) {
      this.data[index].quantite = this.data[index].quantite - 1;
      this.onChangeTotals();

      this.ref.detectChanges();
    }
    else {
      this.data[index].quantite = 1;
      this.onChangeTotals();

      this.ref.detectChanges();
    }
  }
  addQty(index) {
    this.data[index].quantite = this.data[index].quantite + 1;
    this.onChangeTotals();

    this.ref.detectChanges();
  }

  onChangeTotals() {
    this.totalPoints = 0
    this.totalPrice = 0
    for (let i = 0; i < this.data.length; i++) {
      console.log('nnnnnnn', i);
      this.totalPoints += this.data[i].point * this.data[i].quantite;
      this.totalPrice += this.data[i].prixfinal * this.data[i].quantite;
      console.log('fffffffffffff', this.totalPoints, this.totalPrice);
    }
  }

  removeProductFromOrder(index) {
    this.orderService.removeProductFromOrder(index);
    this.onChangeTotals();

    this.ref.detectChanges();
  }


  msg = "سيتم إرسال طلبك إلى البائع الخاص بك، هل أنت متأكد من القيام بالشراء ؟"
  async sendOrder() {
    const alert = await this.alertIonic.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: this.msg,
      buttons: ['إلغاء', {
        text: 'تأكيد',
        handler: () => {

          let order = { order: this.data, prixtotal: this.totalPrice, pointtotal: this.totalPoints };
          console.log(order);

          console.log("confirmé");
          this.orderService.sendOrder(order).subscribe(res => {
            this.orderService.myCart = [];
            this.data = [];
            this.showSuccessAlerte = true;
          }, err => {
            console.log("erreur");
          })
        }
      }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
