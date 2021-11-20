import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-vendeur-my-product',
  templateUrl: './vendeur-my-product.page.html',
  styleUrls: ['./vendeur-my-product.page.scss'],
})
export class VendeurMyProductPage implements OnInit {

  selectedToggle: boolean = false;
  data: any;

  constructor(private productService: ProductsService, private router: ActivatedRoute) {
    this.getProductsBySeller()
  }

  ngOnInit() {
  }

  getProductsBySeller() {
    this.productService.getProductsBySeller().subscribe((res: any) => {
      console.log(res);
      this.data = res
    })
  }

}
