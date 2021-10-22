import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendeur-demandedetail',
  templateUrl: './vendeur-demandedetail.page.html',
  styleUrls: ['./vendeur-demandedetail.page.scss'],
})
export class VendeurDemandedetailPage implements OnInit {

  data = [
    {
      img: "../../../assets/images/product/prod2.jpg",
      codeProduit: "AD2105444",
      category: "الشاي",
      qte: 20,
      prixUnitaire: 22.50
    },
    {
      img: "../../../assets/images/product/prod4.jpg",
      codeProduit: "AD2105444",
      category: "الشاي",
      qte: 32,
      prixUnitaire: 45.90
    },
    {
      img: "../../../assets/images/product/prod4.jpg",
      codeProduit: "AD2105444",
      category: "الشاي",
      qte: 32,
      prixUnitaire: 45.90
    },
    {
      img: "../../../assets/images/product/prod1.jpg",
      codeProduit: "AD2105444",
      category: "أدوات التنظيف",
      qte: 12,
      prixUnitaire: 30.10
    },
    {
      img: "../../../assets/images/product/prod2.jpg",
      codeProduit: "AD2105444",
      category: "الشاي",
      qte: 20,
      prixUnitaire: 22.50
    },
    {
      img: "../../../assets/images/product/prod4.jpg",
      codeProduit: "AD2105444",
      category: "الشاي",
      qte: 32,
      prixUnitaire: 45.90
    },
    {
      img: "../../../assets/images/product/prod2.jpg",
      codeProduit: "AD2105444",
      category: "الشاي",
      qte: 20,
      prixUnitaire: 22.50
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
