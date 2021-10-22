import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendeur-statistique-vente',
  templateUrl: './vendeur-statistique-vente.page.html',
  styleUrls: ['./vendeur-statistique-vente.page.scss'],
})
export class VendeurStatistiqueVentePage implements OnInit {

  dataDay = [
    { nom: "ليبتون 25 كيس", serial: 20254611000, qte: 1200, note: 500, prix: (15000.60).toFixed(2) },
    { nom: "شاي لوبان الأخضر ", serial: 20254611569, qte: 500, note: 230, prix: (7900.00).toFixed(2) },
    { nom: "الاتقان الشاي الأخضر", serial: 20254683520, qte: 180, note: 120, prix: (820.30).toFixed(2) },
    { nom: "شاي الزعتر الزعيترة", serial: 20254652906, qte: 320, note: 190, prix: (1790.50).toFixed(2) },
    { nom: "شاي الزعتر الزعيترة", serial: 20254652906, qte: 320, note: 190, prix: (1790.50).toFixed(2) },
    { nom: "شاي الزعتر الزعيترة", serial: 20254652906, qte: 320, note: 190, prix: (1790.50).toFixed(2) },
    { nom: "شاي الزعتر الزعيترة", serial: 20254652906, qte: 320, note: 190, prix: (1790.50).toFixed(2) },
    { nom: "شاي الزعتر الزعيترة", serial: 20254652906, qte: 320, note: 190, prix: (1790.50).toFixed(2) },
    { nom: "شاي الزعتر الزعيترة", serial: 20254652906, qte: 320, note: 190, prix: (1790.50).toFixed(2) },
  ]
  sommeDataDay = {
    qtes: 2300,
    nbrFacture: 450,
    notes: 1040,
    prixs: (25511.40).toFixed(2)
  }

  dataDays = [
    { date: "2021-08-19", qte: 1850, note: 410, prix: (11100.60).toFixed(2) },
    { date: "2021-08-20", qte: 1470, note: 380, prix: (10220.60).toFixed(2) },
    { date: "2021-08-21", qte: 3453, note: 930, prix: (24105.60).toFixed(2) },
    { date: "2021-08-22", qte: 2320, note: 720, prix: (18500.60).toFixed(2) }
  ];
  sommeDataMount = {
    qtes: 9093,
    nbrFacture: 480,
    notes: 2440,
    prixs: (63927.4).toFixed(2)
  }

  dataMounts = [
    { date: "2021-04", facture: 1850, note: 122680, prix: (14430).toFixed(2) },
    { date: "2021-05", facture: 1470, note: 56290, prix: (23340).toFixed(2) },
    { date: "2021-06", facture: 3453, note: 43550, prix: (18903).toFixed(2) },
    { date: "2021-07", facture: 2320, note: 23572, prix: (20352).toFixed(2) }
  ];

  selectedSegment = "day";

  constructor() { }

  ngOnInit() {
  }

}
