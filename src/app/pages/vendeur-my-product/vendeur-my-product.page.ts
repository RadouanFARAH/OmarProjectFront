import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vendeur-my-product',
  templateUrl: './vendeur-my-product.page.html',
  styleUrls: ['./vendeur-my-product.page.scss'],
})
export class VendeurMyProductPage implements OnInit {

  selectedToggle: boolean = false;
  data: any;
  phrase: string='';
  url=environment.url
  constructor(private storage:Storage,private productService: ProductsService, private router: ActivatedRoute) {
    console.log("hola");
    this.getProductsBySeller()
  }

  ngOnInit() {
  }
  toggelappear(d){
    this.phrase = d.appear==1? 'ظاهر للعملاء' : 'غير ظاهر للعملاء' 
    setTimeout(()=>{
      this.phrase = ''
    }, 3000)
    d.appear = d.appear==1?0:1
    console.log(d);
      this.productService.toggelappear({data:d}).subscribe((res)=>{
      console.log("toggled ok");
      
    },(err)=>{console.log(err);
    })
  }
ionViewDidEnter(){
  this.getProductsBySeller()
}
  getProductsBySeller() {
    console.log("hola");
    this.productService.getProductsBySeller().subscribe((res: any) => {
      console.log(res);
      for (let i = 0; i<res.length; i++){
        res[i].toggel = res[i].appear===1?true:false
      }
      this.data = res
    })
  }

}
