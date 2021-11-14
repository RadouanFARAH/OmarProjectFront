import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { RejectComponent } from 'src/app/modals/reject/reject.component';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-vendeur-home',
  templateUrl: './vendeur-home.page.html',
  styleUrls: ['./vendeur-home.page.scss'],
})
export class VendeurHomePage implements OnInit {
  // etatDemande : V/Validé, A/Attente, R/Refusé

  data = {
    jour: "",
    zone: "",
    responsable: "",
    vendeur: "",
    noteJour: 0,
    nbrTotalConso: 0,
    consoValide: 0,
    consoAttente: 0,
    consoRefuse: 0,
    demande: []
  }

  data2 = [
    { vendeur: "إيمان أوفقير", zone: "حي أكدال" },
    { vendeur: "عبد الفتاح ارقياق", zone: "حي الفتح" },
    { vendeur: "مونية المنبهي", zone: "حي عكاري" }
  ]

  isShow: boolean = false;
  numClickMenu: number = 0;
  userID: any;

  constructor(private router:ActivatedRoute,public modalController: ModalController,private menu: MenuController, private paramService:ParametresService) { 
    console.log("vendeur page");
        
    this.getDashboard()

  }
  async openRejectConsumerModal(id) {
    console.log("modal ...");
    
    const modal = await this.modalController.create({
      component: RejectComponent,
      cssClass: 'my-custom-class',
      componentProps: { 
        idconsommateur: id
      }
    });
    return await modal.present();
  }
  getDashboard(){
    console.log("vendeur page ....");

    this.paramService.getVendeur_dashboard().subscribe((result:any)=>{
      this.data.jour= new Date().toLocaleDateString('ar-EG-u-nu-latn',{weekday: 'long'})
      this.data.zone= result[0].zone
      this.data.responsable= result[0].responsable
      this.data.vendeur= result[0].vendeur
      this.data.noteJour= result[0].noteJour
      this.data.nbrTotalConso= result[0].nbrTotalConso
      this.data.consoValide= result[0].consoValide
      this.data.consoAttente= result[0].consoAttente
      this.data.consoRefuse= result[0].consoRefuse
      console.log("refuse",result[0].consoRefuse);
      
    })
    this.paramService.getconsovalide().subscribe((result:any)=>{
      result.forEach((row)=>{
        this.data.demande.push(row)
      })
    })
    this.paramService.getconsoAttente().subscribe((result:any)=>{
      result.forEach((row)=>{
        this.data.demande.push(row)
      })
    })
    this.paramService.consoRefuse().subscribe((result:any)=>{
      result.forEach((row)=>{
        this.data.demande.push(row)
      })
    })
    
  }
  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.data.demande = []
    this.getDashboard()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'vendeur-menu')
  }
  ionViewWillLeave() {
    this.menu.enable(false, 'vendeur-menu')
  }

  showMenu() {
    this.numClickMenu++;
    this.isShow = this.numClickMenu % 2 == 0 ? false : true;
    console.log(this.isShow, this.numClickMenu);

  }
}
