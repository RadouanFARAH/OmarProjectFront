import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform, AlertController, IonRouterOutlet, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private platform: Platform,
    private router:Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,private storage: Storage, private helper: JwtHelperService) { 
      this.initializeApp();
    }

  async ngOnInit() {
    await this.storage.create();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('visited').then((isVisited)=>{
        console.log('is Visited:',isVisited);
        this.storage.get('token').then((token)=>{
          if (isVisited && !token) {
            this.router.navigate(['/login'])
          }else if (!isVisited){
            console.log("starting ......");
            this.router.navigate(['/logaccount']).then(()=>{
            console.log("finish ......");
              this.storage.set('visited', true)
            })
          }
        })
      })
    })
  }
}

