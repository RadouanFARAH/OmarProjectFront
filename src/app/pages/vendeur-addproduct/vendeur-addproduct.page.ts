import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParametresService } from 'src/app/services/parametres.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendeur-addproduct',
  templateUrl: './vendeur-addproduct.page.html',
  styleUrls: ['./vendeur-addproduct.page.scss'],
})
export class VendeurAddproductPage implements OnInit {

  dataForm: FormGroup;
  showErrorAlerte: boolean = false;
  showSuccessAlerte: boolean = false;
  categories: any;
  image: any;

  constructor(private router:ActivatedRoute,public alertIonic: AlertController, private fb: FormBuilder, private paramService: ParametresService) {
    this.paramService.getAllCategories().subscribe((res: any) => {
      this.categories = res
    })
  }

  ngOnInit() {

    this.dataForm = this.fb.group({
      nom: [""],
      prixInitial: [""],
      prixFinal: [""],
      category: [""],
      ville: [""],
      description: [""]
    })
  }

  setProduct() {
    console.log(this.image);
    let code = "P"+Date.now();
    // this.image.name = code+ this.image.name.split('.')[1];
    const formData = new FormData(); 
    formData.append('image', this.image, code + '.'+this.image.name.split('.')[1]);
    let data = {
      ...this.dataForm.value,
      code
    }
    this.paramService.setProduct(data).subscribe((res: any) => {
      // this.showSuccessAlerte = true;
      this.paramService.setProductImage(formData).subscribe((res: any) => {
        this.showSuccessAlerte = true;
        this.dataForm.reset();
        this.image = null;
        setTimeout(() => {
          this.showSuccessAlerte = false;
        }, 3000);
      })
    })
  }
  ionViewWillEnter(){
    this.showErrorAlerte = false
    this.showSuccessAlerte = false
  }

  onChange(e){
    this.image = e.target.files[0]
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
