import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ResponsableService } from 'src/app/services/responsable.service';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-responsable-home',
  templateUrl: './responsable-home.page.html',
  styleUrls: ['./responsable-home.page.scss'],
})
export class ResponsableHomePage implements OnInit {


  data = {
    jour: "الخميس",
    zone: "حي رحمة 1",
    responsable: "عمر",
    vendeur: "عبد القادر",
    noteJour: 1200,
    nbrTotalConso: 500,
    consoValide: 450,
    consoAttente: 48,
    consoRefuse: 2,
    demande: [
      {
        nomConso: "محمد",
        noteDemande: 40,
        prixDemande: 500,
        etatDemande: "V"
      },
      {
        nomConso: "محسين",
        noteDemande: 35,
        prixDemande: 350.60,
        etatDemande: "V"
      },
      {
        nomConso: "عادل",
        noteDemande: 0,
        prixDemande: 0,
        etatDemande: "A"
      },
      {
        nomConso: "طارق",
        noteDemande: 0,
        prixDemande: 0,
        etatDemande: "A"
      },
      {
        nomConso: "معاد",
        noteDemande: 0,
        prixDemande: 0,
        etatDemande: "R"
      },
    ]
  }

  data2 = []


  // role1 = "V";
  // role2 = "R";
  // user = this.role1 == "V" ? true : false;

  isShow: boolean = false;
  numClickMenu: number = 0;
  detail: boolean = false;

  constructor(private route:Router,private storage:Storage,private userService:UserService,private menu: MenuController, private responsableService:ResponsableService, private router:Router ) {
    this.data.jour= new Date().toLocaleDateString('ar-EG-u-nu-latn',{weekday: 'long'});
    this.responsableService.getVendeurByReponsableByDay().then((res:any)=>{
      res.subscribe((r)=>{
        this.data2 = r
      })
    }, err=>{ 
      console.log(err);
      
    })
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'responsable-menu')
  }
  ionViewWillLeave() {
    this.menu.enable(false, 'responsable-menu')
  }

  showDetail(vendeur) {
    console.log("vendeur :",vendeur );
    //  authenticate vendeur
    this.storage.set('responsable', true)
    this.userService.login({...vendeur, responsable:true}).subscribe(async (res:any)=>{
      console.log('login result 2________ : ', res);
      // localStorage.setItem('token', res.token);
      await this.storage.set('token', res.token)
      await this.storage.set('username', res['name'])
      await this.userService.name.next(res['name'])
      if (res.role=="C") {
        this.route.navigate(["categories"])
      }else if (res.role=="V") {
        console.log("this.route.navigate(['vendeur-home'])");

        this.route.navigate(["vendeur-home"])
      }else if (res.role=="R") {
        this.route.navigate(["responsable-home"])
      }
    
    }, (err)=>{})
  }

}
