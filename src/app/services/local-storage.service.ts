import { Injectable } from '@angular/core';
import { Campaign } from '../model/campaign.type';
import { CampaignsService } from './campaigns.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'campaigns';

  constructor(private campaignsService: CampaignsService) {
    this.initializeLocalStorage();
  }
  private initializeLocalStorage(): void {
    if (!localStorage.getItem(this.storageKey)) {
      const mockCampaigns = this.campaignsService.mockCampaigns;
      this.saveCampaigns(mockCampaigns);
    }
  }
  getCampaigns(): Campaign[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  saveCampaigns(campaigns: Campaign[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(campaigns));
  }

  addCampaign(campaign: Campaign): void {
    const campaigns = this.getCampaigns();
    campaigns.push(campaign);
    this.saveCampaigns(campaigns);
  }
}
