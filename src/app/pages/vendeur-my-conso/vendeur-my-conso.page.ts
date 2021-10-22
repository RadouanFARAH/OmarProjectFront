import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendeur-my-conso',
  templateUrl: './vendeur-my-conso.page.html',
  styleUrls: ['./vendeur-my-conso.page.scss'],
})
export class VendeurMyConsoPage implements OnInit {

  nbrConsomateurTotal = 674;
  data = [
    { jour: "الأثنين", zone: "حي أكدال" },
    { jour: "الثلاثاء", zone: "حي الرياض" },
    { jour: "الأربعاء", zone: "حي السويسي" },
    { jour: "الخميس", zone: "قصبة الأوداية حي" },
    { jour: "الجمعة", zone: "حي يعقوب المنصور" },
    { jour: "السبت", zone: "حي الفتح" },
    { jour: "الأحد", zone: "حي عكاري" },
  ];

  data2 = [
    { nom: "حمزة عفافي", dateInscription: "2021-09-05", id: "c_r_19961600" },
    { nom: "حمزة شتيتي", dateInscription: "2021-08-15", id: "c_r_19961601" },
    { nom: "معاذ", dateInscription: "2021-09-08", id: "c_r_19961602" },
    { nom: "معاذ حيدور", dateInscription: "2021-10-18", id: "c_r_19961603" },
    { nom: "خالد زيدوح", dateInscription: "2021-07-09", id: "c_r_19961604" },
    { nom: "حمزة عفافي", dateInscription: "2021-08-15", id: "c_r_19961605" },
    { nom: "حمزة عفافي", dateInscription: "2021-08-15", id: "c_r_19961606" },
    { nom: "حمزة عفافي", dateInscription: "2021-08-15", id: "c_r_19961607" },
    { nom: "حمزة عفافي", dateInscription: "2021-08-15", id: "c_r_19961608" },
    { nom: "حمزة عفافي", dateInscription: "2021-08-15", id: "c_r_19961609" },
    { nom: "حمزة عفافي", dateInscription: "2021-08-15", id: "c_r_19961610" },
  ]
  constructor() { }

  ngOnInit() {
  }


}
