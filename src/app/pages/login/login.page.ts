
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from "@ionic/angular";
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dataForm: FormGroup;

  showPassword: boolean = false;
  passwordToggleIcon = "eye";
  showErrorAlerte: boolean = false;
  password: any = "";
  identifant: any = "";
  spinner: boolean;

  constructor(private toast:ToastController,private route: Router, private storage: Storage, private menu: MenuController, private userService: UserService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.dataForm = this.fb.group({
      id: [""],
      pwd: [""]
    })
  }

  // show & hide password
  togglePassword() {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  login() {
    this.spinner = true
    let data = this.dataForm.value;
    this.userService.login(data).subscribe(async (res: any) => {
      this.spinner = false
      console.log('token________ : ', res.token);
      // localStorage.setItem('token', res.token);
      await this.storage.set('token', res.token)
      await this.storage.set('username', res['name'])
      await this.storage.set('role', res['role'])
      await this.userService.name.next(res['name'])
      
      if (res.role=="C") {
        this.route.navigate(["categories"])
      }else if (res.role=="V") {
        this.route.navigate(["vendeur-home"])
      }else if (res.role=="R") {
        await this.storage.set('tokenR', res.token)
        this.route.navigate(["responsable-home"])
      }
      console.log("login successed");
    }, async (err)=>{
      this.spinner = false
      const toast = await this.toast.create({
        message: 'حدث خطأ المرجو إعادة المحاولة',
        duration: 2000,
        position: 'top',
        cssClass:"failedtoastclass"
      });
      toast.present();
    })
  }

  reDo() {
    this.identifant = "";
    this.password = "";
    this.showErrorAlerte = false;
  }
}
