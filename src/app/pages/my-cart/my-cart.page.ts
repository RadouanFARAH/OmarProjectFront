import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { MyOrdersService } from 'src/app/services/my-orders.service';
import { ParametresService } from 'src/app/services/parametres.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  data: any;
  showSuccessAlerte: boolean = false;
  showErrorAlerte: boolean = false;
  totalPoints: number = 0;
  totalPrice: number = 0;
  url = environment.url
  app_cost: number = 0;

  constructor(private paramService: ParametresService, private navCtrl: NavController, private ref: ChangeDetectorRef, public alertIonic: AlertController, private orderService: MyOrdersService, private activeRouter: ActivatedRoute) {
    this.data = this.orderService.myCart;
  }

  ngOnInit() {
    this.paramService.getAppCost().subscribe((res:number) => {
      this.app_cost = res
    })
  }

  goBack() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
    for (let i = 0; i < this.data.length; i++) {
      this.totalPoints += this.data[i].point_c * this.data[i].quantite;
      this.totalPrice += (this.data[i].special?this.data[i].prixspecial:this.data[i].prixfinal +this.data[i].special?0:this.data[i].deliveryPrice)  * this.data[i].quantite;
    }
    this.totalPrice += this.app_cost || 2
  }

  addQty(index) {
    this.orderService.increaseOrderQuantity(index)
    this.onChangeTotals();
    this.ref.detectChanges();
  }

  minusQty(index) {
    if (this.orderService.myCart[index].quantite > 1) {
      this.orderService.decreaseOrderQuantity(index)
      this.onChangeTotals();
      this.ref.detectChanges();
    }
  }



  // minusQty(index) {
  //   if (this.data[index].quantite > 1) {
  //     this.data[index].quantite = this.data[index].quantite - 1;
  //     this.onChangeTotals();

  //     this.ref.detectChanges();
  //   }
  //   else {
  //     this.data[index].quantite = 1;
  //     this.onChangeTotals();

  //     this.ref.detectChanges();
  //   }
  // }
  // addQty(index) {
  //   this.data[index].quantite = this.data[index].quantite + 1;
  //   this.onChangeTotals();
  //   this.ref.detectChanges();
  // }

  onChangeTotals() {
    this.totalPoints = 0
    this.totalPrice = 0
    for (let i = 0; i < this.data.length; i++) {
      this.totalPoints += this.data[i].point_c * this.data[i].quantite;
      this.totalPrice += (this.data[i].special?this.data[i].prixspecial:this.data[i].prixfinal +this.data[i].special?0:this.data[i].deliveryPrice)* this.data[i].quantite;
    }
    this.totalPrice += this.app_cost || 2
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
