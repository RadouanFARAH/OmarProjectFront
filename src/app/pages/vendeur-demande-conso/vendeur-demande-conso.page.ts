import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { RejetsPage } from 'src/app/modals/rejets/rejets.page';
import { CallNumberService } from 'src/app/services/call-number.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/toasts/toast.service';
@Component({
  selector: 'app-vendeur-demande-conso',
  templateUrl: './vendeur-demande-conso.page.html',
  styleUrls: ['./vendeur-demande-conso.page.scss'],
})
export class VendeurDemandeConsoPage implements OnInit {

  data1 = {
    // id: "s1 v2 r2o h,r c10",
    nom: "",
    adresse: "",
    numPhone: "",
    numWhatsapp: "",
    email: ""
  }

  data2 = {
    id: "",
    date: "",
    note: 0,
    prix: 0
  }
  d: any;
  role: string;

  constructor(private navCtrl:NavController,private toast:ToastService,private route:Router,private storage:Storage,private userService:UserService,private router:ActivatedRoute,private callNumber:CallNumberService,private modalController:ModalController, private activeRoute:ActivatedRoute) {
    this.storage.get('role').then((role) => {
      console.log(role);

      if (role) {
        this.role = role
      }
    })
    this.activeRoute.params.subscribe((params)=>{
      this.data1.nom=params.nomprenom;
      this.data1.adresse=params.adresselogement;
      this.data1.numPhone=params.tel;
      this.data1.numWhatsapp=params.whatsapp;
      this.data1.email=params.email;
      this.data2.id=params.codecommande;
      this.data2.date=params.datecommande;
      this.data2.note= params.pointtotal;
      this.data2.prix= params.prixtotal;
    })
   }
   goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    this.router.params.subscribe((params)=>{
      console.log(params);
      
      if (params) this.d = params
    })
  }


  goTo(consommateur) {
    if (this.role == 'V') this.userService.login({consommateur}).subscribe(async (res:any)=>{
      await this.storage.set('token', res.token)
      this.route.navigate(["/categories"])
    }, (err)=>{
      this.toast.presentErrorToast('', 3000)
    })
  }
  call(number){
    this.callNumber.call(number)
  }


  async openRejectConsumerModal(id) {
    console.log("modal ...");
    
    const modal = await this.modalController.create({
      component: RejetsPage,
      cssClass: 'my-custom-class',
      componentProps: { 
        idconsommateur: id
      }
    });
    return await modal.present();
  }
}
