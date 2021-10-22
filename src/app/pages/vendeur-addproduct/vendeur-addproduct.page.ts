import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-vendeur-addproduct',
  templateUrl: './vendeur-addproduct.page.html',
  styleUrls: ['./vendeur-addproduct.page.scss'],
})
export class VendeurAddproductPage implements OnInit {

  dataForm: FormGroup;
  showErrorAlerte: boolean = false;
  showSuccessAlerte: boolean = false;

  constructor(public alertIonic: AlertController, private fb: FormBuilder, private paramService: ParametresService) { }

  ngOnInit() {
    this.dataForm = this.fb.group({
      nom: [""],
      prixInitial: [""],
      prixFinal: [""],
      category: [""],
      ville: [""],
      description: [""],
    })
  }

  setProduct() {
    let data = this.dataForm.value;
    this.paramService.setProduct(data).subscribe((res: any) => {
      this.showSuccessAlerte = true;
    })
  }


  // modelMsg = "تم إرسال المنتج إلى الإدارة، سيتم نشره إلى عملائك  بعد التأكيد."
  msg = "هل أنت متأكد من صحة المعلومات التي قمت بإدخالها لنشر المنتج ؟"
  async showAlert() {
    const alert = await this.alertIonic.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: this.msg,
      buttons: ['إلغاء', {
        text: 'تأكيد',
        handler: () => {
          this.setProduct();
          console.log("confirmé");
        }
      }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
