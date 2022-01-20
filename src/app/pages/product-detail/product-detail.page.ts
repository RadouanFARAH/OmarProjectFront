import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CallNumberService } from 'src/app/services/call-number.service';
import { MyOrdersService } from 'src/app/services/my-orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {


  imgs = []
  data = {
    productInfos: {
      nom: "",
      prixInitial: 0,
      prixFinal: 0,
      category: "",
      description: "",
      special:false,
      reduction:""
    },
    vendeurInfos: {
      nom: "",
      tel: ""
    }
  }

  // num: "0" + (622556677).toFixed(0)

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  qte: number = 0;
  commandeNum: number = 0;
  isProductExitsInOrder: boolean = false;
  product: any;
  url=environment.url
  added: boolean;
  constructor(private navCtrl:NavController,private callNumber:CallNumberService,private activeRouter: ActivatedRoute, private orderService: MyOrdersService) {
    this.orderService.calculate_quantity()
    this.commandeNum = this.orderService.cart_quantity.value
    this.orderService.cart_quantity.subscribe((qte)=>{
      this.commandeNum = qte
    })

    this.activeRouter.params.subscribe(params => {
      this.imgs.push(this.url+'/images/image_'+params.code+'.png')
      for (let i=0; i<params.urls; i++){
        this.imgs.push(this.url+'/images/image_'+params.code+"A"+i+'.png')
      }
      this.product = params
      this.data = {
        
        productInfos: {
          nom: params.nom,
          prixInitial: params.prixinitial,
          prixFinal: params.prixfinal,
          category: params.categorie,
          description: params.description,
          special:params.special,
          reduction:params.reduction
        },
        vendeurInfos: {
          nom: params.nomprenom,
          tel: params.tel
        }
      }

    })

  }
  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
  }
  call(number){
   this.callNumber.call(number);
  }
  ionViewWillEnter(){
   this.qte = this.orderService.get_product_quantity(this.product.id)
   this.orderService.calculate_quantity()
   this.commandeNum = this.orderService.cart_quantity.value
   this.orderService.cart_quantity.subscribe((qte) => {
     this.commandeNum = qte
   })
  }
  ionViewWillLeave(){
   this.qte = this.orderService.get_product_quantity(this.product.id)
   this.orderService.calculate_quantity()
   this.commandeNum = this.orderService.cart_quantity.value
   this.orderService.cart_quantity.subscribe((qte) => {
     this.commandeNum = qte
   })
  }
  checkProductInOrder(id) {
    for (let i = 0; i < this.orderService.myCart.length; i++) {
      if (id == this.orderService.myCart[i].id) return {exist:true,index:i}
    }
    return {exist:false, index:0}
  }

  addQty() {
    this.qte++
    this.added=true
    let product = { ...this.product, quantite: this.qte }
    if (this.checkProductInOrder(this.product.id).exist){
      this.orderService.increaseOrderQuantity(this.checkProductInOrder(this.product.id).index)
    }else{
      this.orderService.addProductToOrder(product)
    }
    
    
  }

  minusQty() {
    this.qte--
    if (this.checkProductInOrder(this.product.id).exist){
      let index = this.checkProductInOrder(this.product.id).index
      let product = this.orderService.myCart[index]
      if (product.quantite === 1){
        this.orderService.removeProductFromOrder(index)
        this.added=false
      }else{
        this.orderService.decreaseOrderQuantity(index)
        
      }
    }
    
  }



}
