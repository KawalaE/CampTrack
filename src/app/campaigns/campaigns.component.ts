import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignComponent } from '../components/campaign/campaign.component';
import { Campaign } from '../model/campaign.type';
import { CampaignsService } from '../services/campaigns.service';

@Component({
  selector: 'app-campaigns',
  imports: [CampaignComponent],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
})
export class CampaignsComponent {
  campaignService = inject(CampaignsService);
  campaignItems = signal<Array<Campaign>>([]);
  productId!: number;

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.loadCampaigns();
  }
  loadCampaigns() {
    const allCampaigns = this.campaignService.mockCampaigns;

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.productId === this.productId
    );

    this.campaignItems.set(filteredCampaigns);
  }

  constructor(private route: ActivatedRoute) {}
}
