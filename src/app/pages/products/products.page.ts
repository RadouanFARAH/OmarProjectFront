import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyOrdersService } from 'src/app/services/my-orders.service';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  commandeNum: number = 0;
  id: any;

  // categories = [
  //   { category: "الخضر", ref: "../../../assets/images/category/cat1.png" },
  //   { category: "الفواكه", ref: "../../../assets/images/category/cat2.png" },
  //   { category: "الدقيق", ref: "../../../assets/images/category/cat3.png" },
  //   // { category: "اللحوم", ref: "../../../assets/images/category/cat4.png" },
  //   { category: "الشاي", ref: "../../../assets/images/category/cat5.png" },
  //   { category: "الشاي", ref: "../../../assets/images/category/cat5.png" },
  //   { category: "الشاي", ref: "../../../assets/images/category/cat5.png" },
  // ]

  // data = [
  //   { nom: "ليبتون 25 كيس", prixFinal: "27.60", prixInitial: "33.10", reduction: ((1 - (27.70 / 33.10)) * 100).toFixed(0), ref: "../../../assets/images/product/prod1.jpg" },
  //   { nom: "شاي لوبان الأخضر", prixFinal: "79.00", prixInitial: "86.60", reduction: ((1 - (79.00 / 86.60)) * 100).toFixed(0), ref: "../../../assets/images/product/prod2.jpg" },
  //   { nom: "الاتقان الشاي الأخضر", prixFinal: "19.50", prixInitial: "", reduction: (0 * 100).toFixed(0), ref: "../../../assets/images/product/prod3.jpg" },
  //   { nom: "شاي الزعتر الزعيترة", prixFinal: "24.90", prixInitial: "99.00", reduction: ((1 - (24.90 / 99.00)) * 100).toFixed(0), ref: "../../../assets/images/product/prod4.jpg" },
  // ]

  constructor(private paramServices: ParametresService, private activeRouter: ActivatedRoute, private orderService: MyOrdersService) {



    this.activeRouter.params.subscribe(params => {
      this.commandeNum = this.orderService.getNumberProductInOrder()
      this.id = params.id
      this.getProductByCategory(params.id);
    })

  }

  ngOnInit() {

  }

  data: any = [];
  getProductByCategory(id) {
    this.paramServices.getProductByCategory(id).subscribe(result => {
      console.log("produit____ : ", result);
      this.data = result;
      this.data.forEach(d => {
        d.urls = d.urls.split(',');
        let reduction = ((100 - (parseFloat(d.prixfinal) / parseFloat(d.prixinitial)) * 100)).toFixed(0);
        d.reduction = reduction;
      });

    })
  }
}
