import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallNumberService } from 'src/app/services/call-number.service';
import { MyOrdersService } from 'src/app/services/my-orders.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {



  data = {
    imgs: [],
    productInfos: {
      nom: "",
      prixInitial: 0,
      prixFinal: 0,
      category: "",
      description: ""
    },
    vendeurInfos: {
      nom: "",
      tel: ""
    }
  }

  // num: "0" + (622556677).toFixed(0)

  slideOpts = {
    initialSlide: this.data.imgs.length - 1,
    speed: 400,
  };

  qte: number = 1;
  commandeNum: number = 0;
  isProductExitsInOrder: boolean = false;
  product: any;

  constructor(private callNumber:CallNumberService,private activeRouter: ActivatedRoute, private orderService: MyOrdersService) {
    this.commandeNum = this.orderService.getNumberProductInOrder();

    this.activeRouter.params.subscribe(params => {
      this.product = params
      this.data = {
        imgs: params.urls.split(','),
        productInfos: {
          nom: params.nom,
          prixInitial: params.prixinitial,
          prixFinal: params.prixfinal,
          category: params.categorie,
          description: params.description
        },
        vendeurInfos: {
          nom: params.nomprenom,
          tel: params.tel
        }
      }

      this.isProductExitsInOrder = this.checkProductInOrder(params.id)
      console.log('-----------------', this.isProductExitsInOrder, this.checkProductInOrder(params.id), params.id, this.orderService.myCart);

    })

  }


  ngOnInit() {
  }
  call(number){
   this.callNumber.call(number);
  }

  minusQty() {
    if (this.qte > 1) {
      this.qte = this.qte - 1;
      console.log(this.qte);
    }
    else {
      this.qte = 1;
    }
  }

  addQty() {
    this.qte = this.qte + 1;
  }

  checkProductInOrder(id): boolean {
    for (let i = 0; i < this.orderService.myCart.length; i++) {
      if (id == this.orderService.myCart[i].id) return true
    }
    return false
  }

  addToCart() {
    let product = { ...this.product, quantite: this.qte }
    this.orderService.addProductToOrder(product)
    this.commandeNum++;
    this.isProductExitsInOrder = true;
  }




}
