import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UserService } from 'src/app/services/user.service';
import { VilleQuartierService } from 'src/app/services/ville-quartier.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-logregister',
  templateUrl: './logregister.page.html',
  styleUrls: ['./logregister.page.scss'],
})
export class LogregisterPage implements OnInit {

  data: FormGroup;

  slideOpts = {

    // initialSlide: 1,

    speed: 400,
    allowSlideNext: false,
    allowSlidePrev: false
  };

  ville: string = "";
  showSuccessAlerte: boolean = false;
  showErrorAlerte: boolean = false;
  genre: any = "";
  role: any = "";
  manChecked: boolean = false;
  womanChecked: boolean = false;
  quartiers: any;
  responsable: any;
  villeDisabled: boolean = true;
  generatePassword: any;
  @ViewChild('slides') slides: IonSlides;
  href: string;
  showSuccessAlerte2: boolean;
  id: any;
  message: string = 'فشل في محاولة التسجيل. المرجو منك إعادة العملية.';
  username: any;
  beingRegistred: boolean;
  genPwd: Object;
  constructor(private toast: ToastController, private storage: Storage, private navCtrl: NavController, private locationService: VilleQuartierService, private fb: FormBuilder, private userService: UserService, private activeRoute: ActivatedRoute, private route: Router) {
    this.storage.get('id').then((id) => {
      this.id = id
    })
    this.storage.get('username').then((username) => {
      this.username = username
    })
    this.activeRoute.params.subscribe((params) => {
      console.log(params);
      if (params.ville) {
        this.beingRegistred = false

        this.ville = params.ville;
        let data = {
          ville: params.ville
        }
        this.locationService.getQuartierByVille(data).subscribe((res: any) => {
          this.quartiers = res
          this.data.patchValue({
            adresselogement: [res[0].id]
          })
        }, err => console.log(err))

      } else {
        this.beingRegistred = true
        this.getVille()
      }

      this.responsable = params.responsable;

      this.role = params.role;
    })
  }
  getVille() {
    this.generatePassword = true;
    this.locationService.getVille().subscribe((ville: any) => {
      this.ville = ville;
      this.data.patchValue({
        ville: [ville]
      })
      this.villeDisabled = true
      let data = {
        ville
      }
      this.locationService.getQuartierByVille(data).subscribe((res: any) => {
        this.quartiers = res
        this.data.patchValue({
          adresselogement: [res[0].id]
        })
      }, err => console.log(err))
    })
  }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    this.data = this.fb.group({
      nomprenom: ["", Validators.required],
      ville: [this.ville],
      adresselogement: ["", Validators.required],
      adresseentreprise: [""],
      tel: [null, Validators.required],
      whatsapp: [null, Validators.required],
      email: ["", Validators.email],
      password: [""]
    })

  }

  preventCaracters(event) {
    let regex = /[0-9]/g;
    var k;
    k = event.key;  //         k = event.keyCode;  (Both can be used)
    return regex.test(k);
  }
  slideNext() {
    this.slides.slidePrev()

    // this.slides.slideNext()
    // this.slides.getActiveIndex().then((index)=>{
    //   console.log("sliding to :",index+1);

    //   this.slides.slideTo(index+1);
    // }) 
  }
  slideBack() {
    this.slides.slidePrev()

    // this.slides.getActiveIndex().then((index)=>{
    //   console.log("sliding to :",index-1);

    //   this.slides.slideTo(index-1);
    // }) 
  }

  checkMan() {
    this.manChecked = true;
    this.womanChecked = false;
    this.genre = 'H';
    console.log(this.genre);

  }
  checkWoman() {
    this.womanChecked = true;
    this.manChecked = false;
    this.genre = 'F';
    console.log(this.genre);
  }
  dismiss() {
    this.showSuccessAlerte2 = false;
    this.goBack()
  }
  register() {
    this.showErrorAlerte = false
    this.showSuccessAlerte = false;

    let data = { ...this.data.value, genre: this.genre, role: this.role, host: this.id, generatePassword: this.generatePassword }
    console.log(data);

    this.userService.register(data).subscribe((res) => {

      this.data.reset()
      this.genPwd = res
      if (this.beingRegistred) {
        let listname = ''
        if (this.role == 'C') listname = 'العملاء'
        if (this.role == 'V') listname = 'البائعين'
        if (this.role == 'R') listname = 'المسؤولين'
        this.href = `whatsapp://send?phone=${data.whatsapp.replace('0', '212')}&text=مرحبا%2C%20لقد%20تمت%20إضافتك%20إلى%20لائحة%20${listname}%2C%20يمكنكم%20ولوج%20تطبيق%20إقتصد%20بأدخال%20رقم%20هاتفكم%20*${data.tel}*%20و%20رمزكم%20السري%20*${res}*`
        this.showSuccessAlerte2 = true;
      } else {
        if (this.role == 'C') {
          let dt = {
            id: data.tel,
            pwd: data.password
          }
          this.userService.login(dt).subscribe(async (res: any) => {

            let decodedToken: any = jwtDecode(res.token)
            console.log('token________ : ', res.token, "  ", decodedToken);
            await this.storage.set('token', res.token)
            await this.storage.set('username', res['name'])
            await this.storage.set('id', decodedToken.id)
            await this.storage.set('role', res['role'])
            await this.userService.name.next(res['name'])
            this.route.navigate(["categories"])

            console.log("login successed");
          }, async (err) => {
            const toast = await this.toast.create({
              message: 'حدث خطأ المرجو إعادة المحاولة',
              duration: 2000,
              position: 'middle',
              cssClass: "failedtoastclass"
            });
            toast.present();
            this.showSuccessAlerte = true;

          })
        }
      }
      // send whatssapp message:



      console.log("register successed");
    }, (err) => {
      if (err.status == 409) {
        this.message = 'المستخدم موجود بالفعل في نظامنا'
      }
      this.showErrorAlerte = true;
      setTimeout(() => {
        this.showErrorAlerte = false;
      }, 3000);
    })
  }
  dimissLoginAlert() {
    this.route.navigate(['login'])
  }
}
