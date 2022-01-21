import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyOrdersService } from 'src/app/services/my-orders.service';
import { ParametresService } from 'src/app/services/parametres.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  commandeNum: number = 0;
  category_name: any;
  category_id: any;
  url = environment.url
  special: boolean;
  data: any = [];

  constructor(private paramServices: ParametresService, private activeRouter: ActivatedRoute, private orderService: MyOrdersService) {

    this.orderService.calculate_quantity()
    this.commandeNum = this.orderService.cart_quantity.value
    this.orderService.cart_quantity.subscribe((qte) => {
      this.commandeNum = qte
    })
    this.activeRouter.params.subscribe(params => {

      this.category_id = params.id
      this.category_name = params.nom
      this.special = params.special
      this.getProductByCategory(params.id, params.special)
    })

  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    console.log("data :", this.data);
    this.orderService.calculate_quantity()
    this.commandeNum = this.orderService.cart_quantity.value
    this.orderService.cart_quantity.subscribe((qte) => {
      this.commandeNum = qte
    })
    if (this.data)
      this.data.forEach(d => {
        // let reduction =  (100 - (parseFloat(this.special?d.prixspecial:d.prixfinal) * 100 / parseFloat(d.prixinitial))).toFixed(0) 
        // d.reduction = reduction;
        d.qte = this.orderService.get_product_quantity(d.id);
        console.log(d);

      });
  }
  ionViewWillLeave() {
    this.orderService.calculate_quantity()
    this.commandeNum = this.orderService.cart_quantity.value
    this.orderService.cart_quantity.subscribe((qte) => {
      this.commandeNum = qte
    })
    if (this.data)
      this.data.forEach(d => {
        // let reduction =  (100 - (parseFloat(this.special?d.prixspecial:d.prixfinal) * 100 / parseFloat(d.prixinitial))).toFixed(0) 
        // d.reduction = reduction;
        d.qte = this.orderService.get_product_quantity(d.id);
      });
  }

  checkProductInOrder(id) {
    for (let i = 0; i < this.orderService.myCart.length; i++) {
      if (id == this.orderService.myCart[i].id) return { exist: true, index: i }
    }
    return { exist: false, index: 0 }
  }
  addQty(prodct) {
    prodct.qte++
    let product = { ...prodct, quantite: prodct.qte }
    if (this.checkProductInOrder(prodct.id).exist) {
      this.orderService.increaseOrderQuantity(this.checkProductInOrder(prodct.id).index)
    } else {
      this.orderService.addProductToOrder(product)
    }


  }

  minusQty(prodct) {
    prodct.qte--
    if (this.checkProductInOrder(prodct.id).exist) {
      let index = this.checkProductInOrder(prodct.id).index
      let product = this.orderService.myCart[index]
      if (product.quantite === 1) {
        this.orderService.removeProductFromOrder(index)
      } else {
        this.orderService.decreaseOrderQuantity(index)
      }
    }

  }

  getProductByCategory(id, special) {
    this.paramServices.getProductByCategory(id, special).subscribe(result => {
      this.data = result;
      console.log("yalah sala");

      this.data.forEach(d => {
        let reduction = (100 - (parseFloat(this.special ? d.prixspecial : d.prixfinal) * 100 / parseFloat(d.prixinitial))).toFixed(0)
        d.reduction = reduction;
        d.qte = this.orderService.get_product_quantity(d.id);
      });
    })
  }
}
