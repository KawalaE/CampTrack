import { Injectable } from '@angular/core';
import { Campaign } from '../model/campaign.type';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'campaigns';
  constructor() {}

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
