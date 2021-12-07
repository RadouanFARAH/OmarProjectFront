import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ParametresService } from 'src/app/services/parametres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendeurStatisticsService } from 'src/app/services/vendeur-statistics.service';
import { Storage } from '@ionic/storage';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  responsable: any;
  vendeurs: any;
  role: any;
  images: any;
  priceError: string;
  imageURL: any = '../../../assets/images/cam2.png';
  imageURLs: any[] = [];
  categoryMessage: string;
  nomMessage: string;
  disabled: boolean = true;

  constructor(private sanitizer: DomSanitizer, private storage: Storage, private service: VendeurStatisticsService, private router: ActivatedRoute, public alertIonic: AlertController, private fb: FormBuilder, private paramService: ParametresService) {
    this.storage.get('role').then((role) => {
      console.log(role);

      if (role) {
        this.role = role
      }
    })
    this.paramService.getAllCategories().subscribe((res: any) => {
      this.categories = res
    })
    this.router.params.subscribe((params) => {
      this.responsable = params.responsable
      if (this.responsable) {
        this.getVendeurByResponsable()
      }
    })
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  ngOnInit() {

    this.dataForm = this.fb.group({
      nom: [""],
      prixInitial: [0],
      prixFinal: [0],
      category: [""],
      ville: [""],
      description: [""],
      deliveryPrice: [0]
    })

    this.dataForm.valueChanges.subscribe(() => {

      // prices check
      if ((this.dataForm.get('prixFinal').value > this.dataForm.get('prixInitial').value) || (this.dataForm.get('category').value.length===0) || (this.dataForm.get('nom').value === '') ){
        this.disabled = true
      } else {
        // console.log(this.dataForm.get('category').value);
        this.disabled = false
      }
      if (this.dataForm.get('prixFinal').value > this.dataForm.get('prixInitial').value){
        this.priceError = "لا يمكن ان يكون ثمن التخفيض أكبر من الثمن الاصلي";
      } else {
        this.priceError = ''
      }

      // category check
      if (this.dataForm.get('category').dirty && this.dataForm.get('category').value === '') {
        this.categoryMessage = 'المرجو إختيار الفئة';
      }else{
        this.categoryMessage = ''
      }

      // name check
      if (this.dataForm.get('nom').dirty && this.dataForm.get('nom').value === '') {
        this.nomMessage = 'المرجو إختيار الاسم';
      } else{
        this.nomMessage = ''
      }

    })

  }

  preventCaracters(event) {
    let regex = /[0-9]/g;
    var k;
    k = event.key;  //         k = event.keyCode;  (Both can be used)
    return regex.test(k);
  }


  // priceValidator(control: AbstractControl) {
  //   let FinalPrice = this.dataForm.get('prixFinal')
  //   if (control.value !== undefined && (isNaN(control.value) || control.value < FinalPrice)) {
  //     return { 'price': true };
  //   }
  //   return null;
  // }

  // priceValidator2(control: AbstractControl) {
  //   let InitialPrice = this.dataForm.get('prixInitial')
  //   if (control.value !== undefined && (isNaN(control.value) || control.value > InitialPrice)) {
  //     return { 'price': true };
  //   }
  //   return null;
  // }

  getVendeurByResponsable() {
    this.service.getVendeurByResponsable().subscribe((res: any) => {
      console.log(res);
      this.vendeurs = res
      console.log(this.vendeurs);

    }, err => console.log(err))
  }
  setProduct() {
    console.log(this.image);
    let code = "P" + Date.now();
    // this.image.name = code+ this.image.name.split('.')[1];
    const formData = new FormData();
    formData.append('image', this.image, code + '.' + this.image.name.split('.')[1]);
    let data = {
      ...this.dataForm.value,
      code
    }
    if (this.images.length > 0) {
      for (let i = 0; i < this.images.length; i++) {
        formData.append('image', this.images[i], code + "A" + '.' + this.image.name.split('.')[1]);
      }
    }
    console.log(data);

    this.paramService.setProduct(data).subscribe((res: any) => {
      // this.showSuccessAlerte = true;
      this.paramService.setProductImage(formData).subscribe((res: any) => {
        this.showSuccessAlerte = true;
        this.dataForm.reset();
        this.imageURL = '../../../assets/images/cam2.png' ;
        this.imageURLs = [];
        setTimeout(() => {
          this.showSuccessAlerte = false;
        }, 3000);
      })
    })

  }
  ionViewWillEnter() {
    this.showErrorAlerte = false
    this.showSuccessAlerte = false
    this.imageURL = '../../../assets/images/cam2.png';
    this.imageURLs = [];
  }

  onChange(e) {
    this.imageURL = this.sanitizeImageUrl(URL.createObjectURL(e.target.files[0]))
    this.image = e.target.files[0]
  }
  onChangeM(e) {
    this.images = e.target.files
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(this.imageURLs);

      this.imageURLs.push(this.sanitizeImageUrl(URL.createObjectURL(e.target.files[i])))
    }
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
