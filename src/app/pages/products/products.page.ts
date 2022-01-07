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
  constructor(private paramServices: ParametresService, private activeRouter: ActivatedRoute, private orderService: MyOrdersService) {

    this.commandeNum = this.orderService.cart_quantity.value
    this.orderService.cart_quantity.subscribe((qte)=>{
      this.commandeNum = qte
    })

    this.activeRouter.params.subscribe(params => {
      
      this.category_id = params.id
      this.category_name = params.nom
      this.getProductByCategory(params.id, params.special)
    })

  }

  ngOnInit() {

  }

  data: any = [];
  getProductByCategory(id,special) {
    this.paramServices.getProductByCategory(id, special).subscribe(result => {
      this.data = result;
      this.data.forEach(d => {
        let reduction =  (100 - (parseFloat(d.prixfinal) * 100 / parseFloat(d.prixinitial))).toFixed(0) 
        d.reduction = reduction;
      });
    })
  }
}
