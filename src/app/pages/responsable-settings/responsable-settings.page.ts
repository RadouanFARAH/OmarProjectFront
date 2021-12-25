import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ResponsableService } from 'src/app/services/responsable.service';
import { VendeurMyConsoService } from 'src/app/services/vendeur-my-conso.service';
import { VilleQuartierService } from 'src/app/services/ville-quartier.service';

@Component({
  selector: 'app-responsable-settings',
  templateUrl: './responsable-settings.page.html',
  styleUrls: ['./responsable-settings.page.scss'],
})
export class ResponsableSettingsPage implements OnInit {
  vendeurs: any;
  quartiers: any;
  days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  selectedVendeur=null;
  selectedDay=null;
  selectedQuartier=null;
  inserted: any[] = [];
  constructor(private toastCtrl: ToastController, private vendeurService: VendeurMyConsoService, private villesService: VilleQuartierService, private responsableService: ResponsableService) { }

  ngOnInit() {
    this.getVendeurByResponsable()
  }

  getVendeurByResponsable() {
    this.responsableService.getVendeurByResponsable().subscribe((vendeurs) => {
      this.vendeurs = vendeurs
    })
  }
  vendeurChanged(ville) {
    console.log("changed");
    this.getQuartierByVille(ville)
  }

  getQuartierByVille(ville) {
    if (ville){
      let data = {
        ville
      }
      this.villesService.getQuartierByVille(data).subscribe((quartiers) => {
        this.quartiers = quartiers
      })
    }
  }
  setVendeurDayZone() {
    let data = {
      mode:'',
      idvendeur: this.selectedVendeur.id,
      idquartier: this.selectedQuartier,
      day: this.selectedDay
    }

    this.vendeurService.getVendeurDayZone(data).subscribe((number) => {
      console.log(number);
      if (number==0){
          this.callSetVendeurDayZone(data)
      }else{
        data.mode = 'U'
        this.callSetVendeurDayZone(data)
      }
    })
  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  callSetVendeurDayZone(data){
    this.vendeurService.setVendeurDayZone(data).subscribe((res) => {
      this.presentSuccessToast('تمت العملية بنجاح');
      this.selectedQuartier = null
      this.selectedDay = null
    }, (err)=>{
      this.presentErrorToast('حدث خطأ ما ، يرجى المحاولة مرة أخرى لاحقًا');
    })
  }

  async presentSuccessToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'middle',
      cssClass: "successtoastclass"
    });
    toast.present();
  }
  async presentErrorToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'middle',
      cssClass: "failedtoastclass"
    });
    toast.present();
  }
}
