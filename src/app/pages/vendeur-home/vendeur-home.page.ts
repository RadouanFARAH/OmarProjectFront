import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
// import { RejectComponent } from 'src/app/modals/reject/reject.component';
import { RejetsPage } from 'src/app/modals/rejets/rejets.page';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-vendeur-home',
  templateUrl: './vendeur-home.page.html',
  styleUrls: ['./vendeur-home.page.scss'],
})
export class VendeurHomePage implements OnInit {
  // etatDemande : V/Validé, A/Attente, R/Refusé
other_places=false;
  data = {
    jour: new Date().toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long' }),
    zone: "",
    responsable: "",
    vendeur: "",
    noteJour: null,
    noteJour_other_places: null,
    nbrTotalConso: null,
    nbrTotalConso_other_places: null,
    consoValide: null,
    consoValide_other_places: null,
    consoAttente: null,
    consoRefuse: null,
    demandeR: [],
    demandeA: [],
    demandeV: [],
    demandeV_other_places:[]
  }


  isShow: boolean = false;
  numClickMenu: number = 0;
  userID: any;
  tapped: boolean;
  demandeR: boolean;
  demandeV: boolean;
  demandeA: boolean;
  dashboard: boolean;
  demandeV_other_places: boolean;

  constructor(private router: ActivatedRoute, private route: Router, public modalController: ModalController, private menu: MenuController, private paramService: ParametresService) {}


  async openRejectConsumerModal(id) {
    const modal = await this.modalController.create({
      component: RejetsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        idconsommateur: id
      }
    });
    return await modal.present();
  }

  getDashboard() {
    this.data.demandeR = []
    this.data.demandeV = []
    this.data.demandeA = []
    this.paramService.getVendeur_dashboard({other_places:false}).subscribe((result: any) => {
      this.dashboard=true
      this.data.zone = result[0].zone
      this.data.responsable = result[0].responsable
      this.data.vendeur = result[0].vendeur
      this.data.noteJour = result[0].noteJour
      this.data.nbrTotalConso = result[0].nbrTotalConso
      this.data.consoValide = result[0].consoValide
      this.data.consoAttente = result[0].consoAttente
      this.data.consoRefuse = result[0].consoRefuse
    }, err=>{
      
      this.dashboard=false

    })
    this.getAll()




  }
  getDashboardOther_places() {
    this.data.demandeV_other_places = []
    this.paramService.getVendeur_dashboard({other_places:true}).subscribe((result: any) => {
      
      this.dashboard=true
      this.data.noteJour_other_places = result[0].noteJour
      this.data.nbrTotalConso_other_places = result[0].nbrTotalConso
      this.data.consoValide_other_places= result[0].consoValide
    })
    this.getConsoValide(true)
  }
  ngOnInit() {
    this.getDashboard()
    this.getDashboardOther_places()
  }

  doRefresh(event) {
    this.data.demandeR = []
    this.data.demandeV = []
    this.data.demandeA = []
    this.getDashboard()
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  passOrder() {
    this.route.navigate(["categories"])
  }


  ionViewWillEnter() {
    this.menu.enable(true, 'vendeur-menu')
  }
  ionViewWillLeave() {
    this.menu.enable(false, 'vendeur-menu')
  }

  getAll() {
    this.data.demandeR = []
    this.data.demandeV = []
    this.data.demandeA = []
    this.demandeR = true
    this.demandeV = true
    this.demandeA = true
    this.paramService.getconsoAttente().subscribe((result: any) => {
      this.tapped = true
      result.forEach((row) => {
        this.data.demandeA.push(row)
      })
    })
    this.paramService.consoRefuse().subscribe((result: any) => {
      this.tapped = true
      result.forEach((row) => {
        this.data.demandeR.push(row)
      })
    })
    this.getConsoValide(false)
  }
  getConsoValide(other_places){
    this.paramService.getconsovalide({other_places}).subscribe((result: any) => {
      this.tapped = true
      result.forEach((row) => {
        other_places?this.data.demandeV_other_places.push(row):this.data.demandeV.push(row)
      })
    })
  }
  
  waitingOrder() {
    this.demandeR = false
    this.demandeV = false
    this.demandeA = true
  }

  refusedOrder() {
    this.demandeR = true
    this.demandeV = false
    this.demandeA = false
  }

  didOrder() {
    this.demandeR = false
    this.demandeV = true
    this.demandeA = false
  }

  didOrder_other_places(){
    this.demandeV_other_places = true
  }

}
