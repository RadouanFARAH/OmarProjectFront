import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logregister',
  templateUrl: './logregister.page.html',
  styleUrls: ['./logregister.page.scss'],
})
export class LogregisterPage implements OnInit {

  data1: FormGroup;
  data2: FormGroup;

  slideOpts = {
    initialSlide: 1,
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

  constructor(private fb: FormBuilder, private userService: UserService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((params) => {
      console.log(params);

      this.ville = params.ville;
      this.role = params.role;
    })
  }

  ngOnInit() {
    this.data1 = this.fb.group({
      nomprenom: [""],
      ville: [this.ville],
      adresselogement: [""],
      adresseentreprise: [""]
    })

    this.data2 = this.fb.group({
      tel: [""],
      whatsapp: [""],
      email: [""],
      password: [""]
    })
  }

  nextSlide(slide, index) {
    slide.slideTo(index)
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

  register() {
    let data = { ...this.data1.value, ...this.data2.value, genre: this.genre, role: this.role }
    console.log(data);

    this.userService.register(data).subscribe((res) => {
      this.showSuccessAlerte = true;
      console.log("register successed");
    })
  }

}
