import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGardService } from './guards/auth-gard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'logaccount',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsPageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailPageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'my-cart',
    loadChildren: () => import('./pages/my-cart/my-cart.module').then(m => m.MyCartPageModule),
    canActivate: [AuthGardService],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'logaccount',
    loadChildren: () => import('./pages/logaccount/logaccount.module').then(m => m.LogaccountPageModule),
    // canActivate: [AuthGardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'logcity',
    loadChildren: () => import('./pages/logcity/logcity.module').then(m => m.LogcityPageModule)
  },
  {
    path: 'logregister',
    loadChildren: () => import('./pages/logregister/logregister.module').then(m => m.LogregisterPageModule)
  },
  {
    path: 'vendeur-home',
    loadChildren: () => import('./pages/vendeur-home/vendeur-home.module').then(m => m.VendeurHomePageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'vendeur-addproduct',
    loadChildren: () => import('./pages/vendeur-addproduct/vendeur-addproduct.module').then(m => m.VendeurAddproductPageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'vendeur-demande-conso',
    loadChildren: () => import('./pages/vendeur-demande-conso/vendeur-demande-conso.module').then(m => m.VendeurDemandeConsoPageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'vendeur-demandedetail',
    loadChildren: () => import('./pages/vendeur-demandedetail/vendeur-demandedetail.module').then(m => m.VendeurDemandedetailPageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'vendeur-demandehistorique',
    loadChildren: () => import('./pages/vendeur-demandehistorique/vendeur-demandehistorique.module').then(m => m.VendeurDemandehistoriquePageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'vendeur-my-conso',
    loadChildren: () => import('./pages/vendeur-my-conso/vendeur-my-conso.module').then(m => m.VendeurMyConsoPageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'vendeur-statistique-vente',
    loadChildren: () => import('./pages/vendeur-statistique-vente/vendeur-statistique-vente.module').then(m => m.VendeurStatistiqueVentePageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'responsable-my-vend',
    loadChildren: () => import('./pages/responsable-my-vend/responsable-my-vend.module').then(m => m.ResponsableMyVendPageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'responsable-home',
    loadChildren: () => import('./pages/responsable-home/responsable-home.module').then(m => m.ResponsableHomePageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'consommateur-points',
    loadChildren: () => import('./pages/consommateur-points/consommateur-points.module').then(m => m.ConsommateurPointsPageModule),
    canActivate: [AuthGardService]
  },
  {
    path: 'consommateur-demandehistorique',
    loadChildren: () => import('./pages/consommateur-demandehistorique/consommateur-demandehistorique.module').then(m => m.ConsommateurDemandehistoriquePageModule)
  },
  {
    path: 'vendeur-my-product',
    loadChildren: () => import('./pages/vendeur-my-product/vendeur-my-product.module').then( m => m.VendeurMyProductPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
