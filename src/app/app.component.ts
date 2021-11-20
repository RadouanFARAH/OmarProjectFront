import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform, AlertController, IonRouterOutlet, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  name: string = "";
  id: any;
  constructor(
    private userService: UserService,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, private storage: Storage, private helper: JwtHelperService, private route: ActivatedRoute) {
    console.log(this.name);
    this.route.params.subscribe((params) => {
      this.id = params.id
    })
    this.userService.name.subscribe((n) => {
      this.name = n
    })
    this.storage.create();
    this.storage.get('visited').then((isVisited) => {
      console.log('is Visited:', isVisited);
      this.storage.get('role').then((role) => {
        console.log('isVisited ', isVisited, " role ", role);

        if (!isVisited) {
          this.router.navigate(['/logaccount']).then(() => {
            console.log("finish ......");
            this.storage.set('visited', true)
          })
        } else  {
          console.log("role ", role);
          
          if (role=="C") {
            this.router.navigate(["categories"])
          }else if (role=="V") {
            this.router.navigate(["vendeur-home"])
          }else if (role=="R") {
            this.router.navigate(["responsable-home"])
          } else {
            this.router.navigate(['/login'])
          }
        }
      })
    })
    this.initializeApp();
  }

  async ngOnInit() {
    console.log(this.name);
    this.userService.name.subscribe((n) => {
      this.name = n
    })
  }
  ionViewWillEnter() {
    console.log(this.name);

    this.userService.name.subscribe((n) => {
      this.name = n
    })
  }
  logout(d) {
    this.storage.get('responsable').then(res => {
      if (res) {
        if (d === "R") {
          this.storage.remove('token')
          this.storage.remove('role')
          this.storage.remove('tokenR')
          this.storage.remove('responsable')
          this.storage.remove('username')
          this.router.navigate(['/login'])
        } else {
          this.router.navigate(['/responsable-home'])
        }
      } else {
        this.storage.remove('role')
        this.storage.remove('token')
        this.storage.remove('tokenR')
        this.storage.remove('responsable')
        this.storage.remove('username')
        this.router.navigate(['/login'])
      }
    })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('visited').then((isVisited) => {
        console.log('is Visited:', isVisited);
        this.storage.get('token').then((token) => {
          if (isVisited && !token) {
            this.router.navigate(['/login'])
          } else if (!isVisited) {
            console.log("starting ......");
            this.router.navigate(['/logaccount']).then(() => {
              console.log("finish ......");
              this.storage.set('visited', true)
            })
          }
        })
      })
    })
  }
}

