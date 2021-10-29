import { Component, OnInit } from '@angular/core';
import { CallNumberService } from 'src/app/services/call-number.service';

@Component({
  selector: 'app-responsable-my-vend',
  templateUrl: './responsable-my-vend.page.html',
  styleUrls: ['./responsable-my-vend.page.scss'],
})
export class ResponsableMyVendPage implements OnInit {

  data1 = {
    id: "s1 v2 r2o h,r c10",
    nom: "عبد القادر مفتاح",
    adresse: "حي رحمة زنقة ثوت رقم  121 ",
    numPhone: "0633549988",
    numWhatsapp: "0633449988",
    numTelegram: "0766332196",
    email: "---"
  }

  data2 = [
    { vendeur: "إيمان أوفقير", zone: "حي أكدال" },
    { vendeur: "عبد الفتاح ارقياق", zone: "حي الفتح" },
    { vendeur: "مونية المنبهي", zone: "حي عكاري" },
    { vendeur: "عبد القادر مفتاح", zone: "حي الفتح" },
  ]

  constructor(private callNumber:CallNumberService) { }

  ngOnInit() {
  }
  call(number){
    this.callNumber.call(number)
  }
}
