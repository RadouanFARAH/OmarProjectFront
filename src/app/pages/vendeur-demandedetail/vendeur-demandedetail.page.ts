import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ParametresService } from 'src/app/services/parametres.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vendeur-demandedetail',
  templateUrl: './vendeur-demandedetail.page.html',
  styleUrls: ['./vendeur-demandedetail.page.scss'],
})
export class VendeurDemandedetailPage implements OnInit {

  order_details: any[]= [];
  url= environment.url
  constructor( private navCtrl:NavController, private activeRoute:ActivatedRoute, private paramService:ParametresService) {
      this.activeRoute.params.subscribe((params)=>{
        let code = params.code
        this.getOrderDetails(code)
      })
   }
   getOrderDetails(code){
     this.paramService.getOrderDetails({code}).subscribe((res:any)=>{
       this.order_details = res
     })
   }
  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }

}
