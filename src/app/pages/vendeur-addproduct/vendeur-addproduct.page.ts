import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ParametresService } from 'src/app/services/parametres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendeurStatisticsService } from 'src/app/services/vendeur-statistics.service';
import { Storage } from '@ionic/storage';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DirecteurService } from 'src/app/services/directeur.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { ToastService } from 'src/app/toasts/toast.service';

@Component({
  selector: 'app-vendeur-addproduct',
  templateUrl: './vendeur-addproduct.page.html',
  styleUrls: ['./vendeur-addproduct.page.scss'],
})
export class VendeurAddproductPage implements OnInit {

  dataForm: FormGroup;
  showErrorAlerte: boolean = false;
  showSuccessAlerte: boolean = false;
  special: boolean = false;
  categories: any;
  image: any = null;
  responsable: any;
  vendeurs: any;
  role: any;
  images: any = [];
  priceError: string;
  imageURL: any = '';
  imageURLs: any[] = [];
  categoryMessage: string;
  nomMessage: string;
  disabled: boolean = true;
  spinner: boolean;
  whoisadding: any;
  responsables: any;

  constructor(private toast:ToastService,private directeurService: DirecteurService, private navCtrl: NavController, private sanitizer: DomSanitizer, private storage: Storage, private service: ResponsableService, private router: ActivatedRoute, public alertIonic: AlertController, private fb: FormBuilder, private paramService: ParametresService) {
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
      this.whoisadding = params.role
      if (this.whoisadding == 'R') {
        this.getVendeurByResponsable()
      }
      if (this.whoisadding == 'D') {
        this.getResponsableByDirecteur()
      }
    })
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  toggelspecial(){
    this.special=!this.special
  }
  ngOnInit() {

    this.dataForm = this.fb.group({
      nom: ["", Validators.required],
      prixInitial: [0, Validators.required],
      prixFinal: [0],
      category: ["", Validators.required],
      lvendeurs: [null],
      lresponsables: [null],
      description: [""],
      deliveryPrice: [0],
      prixspecial:[0]
    })

    if (this.whoisadding == 'R') {
      console.log('is R');

      this.dataForm.patchValue({
        lvendeurs: [null, Validators.required]
      })
    }
    if (this.whoisadding == 'D') {
      this.dataForm.patchValue({
        lresponsables: [null, Validators.required]
      })
    }

    this.dataForm.valueChanges.subscribe(() => {
      console.log(this.dataForm.errors, this.dataForm.invalid);

      // prices check
      if ((this.dataForm.get('prixFinal').value > this.dataForm.get('prixInitial').value) || (this.dataForm.get('category').value.length === 0) || (this.dataForm.get('nom').value === '' || (this.whoisadding == 'R' && !this.dataForm.get('lvendeurs').value) || (this.whoisadding == 'D' && !this.dataForm.get('lresponsables').value))) {
        this.disabled = true
      } else {
        // console.log(this.dataForm.get('category').value);
        this.disabled = false
      }
      if (this.dataForm.get('prixFinal').value > this.dataForm.get('prixInitial').value) {
        this.priceError = "لا يمكن ان يكون ثمن التخفيض أكبر من الثمن الاصلي";
      } else {
        this.priceError = ''
      }

      // category check
      if (this.dataForm.get('category').dirty && this.dataForm.get('category').value === '') {
        this.categoryMessage = 'المرجو إختيار الفئة';
      } else {
        this.categoryMessage = ''
      }

      // name check
      if (this.dataForm.get('nom').dirty && this.dataForm.get('nom').value === '') {
        this.nomMessage = 'المرجو إختيار الاسم';
      } else {
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
  goBack() {
    this.navCtrl.back();
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
  getResponsableByDirecteur() {
    this.directeurService.getResponsableByDirecteur().subscribe((res: any) => {
      console.log(res);
      this.responsables = res
      console.log(this.responsables);

    }, err => console.log(err))
  }
  setProduct() {
    let code = "P" + Date.now();
    let data = {
      ...this.dataForm.value,
      code,
      role: this.role,
      special:this.special,
      urls:this.images.length
    }
    this.paramService.setProduct(data).subscribe((res: any) => {

      const formData = new FormData();
      console.log("formData", formData.has('image'));
      
      if (this.image) {
        formData.append('image', this.image, code + '.' + this.image.name.split('.')[1]);
      }
      if (this.images.length > 0) {
        for (let i = 0; i < this.images.length; i++) {
          formData.append('image', this.images[i], code + "A"+i + '.' + this.image.name.split('.')[1]);
        }
      }
      console.log("formData", formData.has('image'));

      this.paramService.setProductImage(formData).subscribe((res: any) => {
      this.spinner = false
        this.showSuccessAlerte = true;
        this.imageURL = '';
        this.imageURLs = [];
        setTimeout(() => {
          this.goBack();
          this.showSuccessAlerte = false;
        }, 3000);
      }, async (err) => {
      this.spinner = false
        this.toast.presentErrorToast('حدث خطأ المرجو إعادة المحاولة', 2000)
      }
      )
    }, async (err) => {
      this.spinner = false
      this.toast.presentErrorToast('حدث خطأ المرجو إعادة المحاولة',2000)
    })

  }
  ionViewWillEnter() {
    this.showErrorAlerte = false
    this.showSuccessAlerte = false
    this.imageURL = '';
    this.imageURLs = [];
  }

  onChange(e) {

    if (e.target.files[0].size > 1000000) {
      this.toast.presentErrorToast('حجم الصورة كبير جدا', 5000)
      return
    } else {
      this.imageURL = this.sanitizeImageUrl(URL.createObjectURL(e.target.files[0]))
      this.image = e.target.files[0]
    }

  }
  onChangeM(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 1000000) {
        this.toast.presentErrorToast('حجم الصورة كبير جدا', 5000)
        return
      } else {
        this.images.push(e.target.files[i])
        this.imageURLs.push(this.sanitizeImageUrl(URL.createObjectURL(e.target.files[i])))
      }
    }
  }
  deleteImg(i){
    if (i.toString()==='P'){
      document.getElementById('file_input').click()
    } else {
      this.images.splice(i,1)
      this.imageURLs.splice(i,1)
    }
  }

  // modelMsg = "تم إرسال المنتج إلى الإدارة، سيتم نشره إلى عملائك  بعد التأكيد."
  msg = "هل أنت متأكد من صحة المعلومات التي قمت بإدخالها لنشر المنتج ؟"
  async showAlert() {
    console.log("alert triggred");

    const alert = await this.alertIonic.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: this.msg,
      buttons: ['إلغاء', {
        text: 'تأكيد',
        handler: () => {
          this.spinner=true
          this.setProduct();
        }
      }
      ]
    });

    await alert.present();
  }

}
