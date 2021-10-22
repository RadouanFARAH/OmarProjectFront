import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendeur-demande-conso',
  templateUrl: './vendeur-demande-conso.page.html',
  styleUrls: ['./vendeur-demande-conso.page.scss'],
})
export class VendeurDemandeConsoPage implements OnInit {

  data1 = {
    id: "s1 v2 r2o h,r c10",
    nom: "عبد القادر مفتاح",
    adresse: "حي رحمة زنقة ثوت رقم  121 ",
    numPhone: "0633549988",
    numWhatsapp: "0633449988",
    numTelegram: "0766332196",
    email: "---"
  }

  data2 = {
    id: 21054444,
    date: "02-09-2021",
    note: 54,
    prix: 890.50
  }

  constructor() { }

  ngOnInit() {
  }

}
