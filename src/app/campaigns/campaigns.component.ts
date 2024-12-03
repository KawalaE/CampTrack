import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CampaignComponent } from '../components/campaign/campaign.component';
import { FormModalComponent } from '../components/form-modal/form-modal.component';
import { Campaign } from '../model/campaign.type';
import { CampaignsService } from '../services/campaigns.service';
import { LocalStorageService } from '../services/local-storage.service';

import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-campaigns',
  imports: [
    CampaignComponent,
    FormModalComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
})
export class CampaignsComponent {
  campaignService = inject(CampaignsService);
  campaignItems = signal<Array<Campaign>>([]);
  productName = signal<string>('');
  localStorageService = inject(LocalStorageService);
  productsService = inject(ProductsService);
  productId!: number;

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    const product = this.productsService.mockProducts.find(
      (product) => product.id === this.productId
    );
    if (product) {
      this.productName.set(product.name);
    }

    this.loadCampaigns();
  }

  loadCampaigns() {
    const allCampaigns = this.localStorageService.getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.productId === this.productId
    );

    this.campaignItems.set(filteredCampaigns);
  }
  onCampaignDeleted(deletedCampaignId: number) {
    const updatedCampaigns = this.campaignItems().filter(
      (campaign) => campaign.id !== deletedCampaignId
    );
    this.campaignItems.set(updatedCampaigns);
  }

  constructor(private route: ActivatedRoute, private matDialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.matDialog.open(FormModalComponent, {
      width: '350px',
      data: { productId: this.productId },
    });

    dialogRef.componentInstance.campaignCreated.subscribe(
      (newCampaign: Campaign | null) => {
        console.log('newCamapaign', newCampaign);

        if (newCampaign) {
          const baseId = newCampaign.productId;
          const existingCampaigns = [
            ...this.localStorageService.getCampaigns(),
          ];
          let highestId = 1;
          if (existingCampaigns.length > 0) {
            highestId = Number(
              existingCampaigns[existingCampaigns.length - 1].id
                .toString()
                .slice(-2)
            );
          }

          const newId = `${baseId}00${highestId + 1}`;
          newCampaign.id = Number(newId);
          this.localStorageService.addCampaign(newCampaign);
          const updatedCampaigns = [...this.campaignItems(), newCampaign];
          this.campaignItems.set(updatedCampaigns);

          this.localStorageService.decreaseEmeralds(newCampaign.fund);
        }
      }
    );
  }
}
