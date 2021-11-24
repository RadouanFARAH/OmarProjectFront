import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-rejets',
  templateUrl: './rejets.page.html',
  styleUrls: ['./rejets.page.scss'],
})
export class RejetsPage implements OnInit {
  motif;
  constructor(public modalController: ModalController, private paramService: ParametresService, public toastController: ToastController) { }
  idconsommateur;
  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  radioGroupChange(e) {
    this.motif = e.target.value;
  }
  sendMofitRejectOreder() {
    let data = {
      idconsommateur: this.idconsommateur,
      motif: this.motif
    }
    this.paramService.sendMofitRejectOreder(data).subscribe(async (res) => {
      const toast = await this.toastController.create({
        message: 'تمت العملية بنجاح',
        duration: 2000,
        position: 'top',
        cssClass:"successtoastclass"
      });
      toast.present();
      this.dismiss();

    }, async err => {
      const toast = await this.toastController.create({
        message: 'وقع خطأ المرجو اعادة المحاولة',
        duration: 2000,
        position: 'top',
        cssClass:'failedtoastclass'
      });
      toast.present();
    })
  }

}
