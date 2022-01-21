import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, IonSlides, NavController } from '@ionic/angular';
import { ParametresService } from 'src/app/services/parametres.service';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { MyOrdersService } from 'src/app/services/my-orders.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  isShow: boolean = false;
  numClickMenu: number = 0;
  showCat: boolean = false;
  user = "";

  catData = ["المياه والمشروبات", "السوق", "محل بقالة"]
  data = [
    { category: "الخضر", ref: "../../../assets/images/category/cat1.png" },
    { category: "الفواكه", ref: "../../../assets/images/category/cat2.png" },
    { category: "الدقيق", ref: "../../../assets/images/category/cat3.png" },
    // { category: "اللحوم", ref: "../../../assets/images/category/cat4.png" },
    { category: "الشاي", ref: "../../../assets/images/category/cat5.png" },
  ]

  imgsSlider = [
    "../../../assets/images/category/cat001.png",
    "../../../assets/images/category/cat002.png",
    "../../../assets/images/category/cat003.png",
    "../../../assets/images/category/cat004.png",
    "../../../assets/images/category/cat005.png",
    "../../../assets/images/category/cat006.png",
    "../../../assets/images/category/cat007.png",
    "../../../assets/images/category/cat008.png",
    "../../../assets/images/category/cat009.png",
  ].reverse();

  slideOpts = {
    initialSlide: this.imgsSlider.length - 1,
    speed: 400,
    autoplay: true
  };

  imgsSlider2 = [
    "../../../assets/images/product/prod5.jpg",
    "../../../assets/images/product/prod6.jpg",
    "../../../assets/images/product/prod7.jpg",
  ].reverse();

  slideOpts2 = {
    // grabCursor: true,
    // initialSlide: this.imgsSlider2.length - 1,
    // speed: 400,
    // autoplay: false
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // autoplay:true,
  };

  @ViewChild('mySlider2') slides: IonSlides;
  commandeNum: any;
  next() {
    this.slides.slideNext();
  }
  prev() {
    this.slides.slidePrev();
  }

  passingOrder: boolean = false;
  idconsumer: any;
  url: string = environment.url
  constructor(private orderService: MyOrdersService, private navCtrl: NavController, private storage: Storage, private router: ActivatedRoute, private menu: MenuController, private route: Router, private paramService: ParametresService) {
    this.orderService.calculate_quantity()
    this.commandeNum = this.orderService.cart_quantity.value
    this.orderService.cart_quantity.subscribe((qte) => {
      this.commandeNum = qte
    })
    this.getCategory();
    this.specialOrders();
    // this.countdown();
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menu.enable(true, 'consommateur-menu')
    this.orderService.calculate_quantity()
    this.commandeNum = this.orderService.cart_quantity.value
    this.orderService.cart_quantity.subscribe((qte) => {
      this.commandeNum = qte
    })
  }
  ionViewWillLeave() {
    this.menu.enable(false, 'consommateur-menu')
    this.orderService.calculate_quantity()
    this.commandeNum = this.orderService.cart_quantity.value
    this.orderService.cart_quantity.subscribe((qte) => {
      this.commandeNum = qte
    })
  }

  showMenu() {
    this.numClickMenu++;
    this.isShow = this.numClickMenu % 2 == 0 ? false : true;
    console.log(this.isShow, this.numClickMenu);
  }

  showCategory() {
    this.numClickMenu++;
    this.showCat = this.numClickMenu % 2 == 0 ? false : true;
  }

  async logOut() {
    // this.route.navigate(['login']);
    // localStorage.clear();
    await this.storage.clear()
    this.route.navigate(['/login'])
    console.log('test');
  }

  categories: any = []
  getCategory() {
    this.paramService.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    })
  }

  goBack() {
    this.navCtrl.back();
  }

  specialorders: any = []
  specialOrders() {
    this.paramService.specialOrders().subscribe((res) => {
      this.specialorders = res;
    })
  }

  // -- clock
  seconds: number;
  minutes: number;
  hours: number;
  isExpired: boolean = true;

  countdowm = setInterval(() => {
    let timeLimit = new Date().setHours(13, 0, 0);
    let now = new Date().getTime();
    let distance = timeLimit - now;

    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.isExpired = true;

    if (distance < 0) {
      clearInterval(this.countdowm);
      this.isExpired = false;
    }
  }, 1000);

}
