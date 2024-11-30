import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./products/products.component').then(
        (m) => m.ProductsComponent
      );
    },
  },
  {
    path: 'campaigns/:productId',
    loadComponent: () => {
      return import('./campaigns/campaigns.component').then(
        (m) => m.CampaignsComponent
      );
    },
  },
];
