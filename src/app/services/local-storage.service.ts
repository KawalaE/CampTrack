import { Injectable } from '@angular/core';
import { Campaign } from '../model/campaign.type';
import { roundToTwoDecimals } from '../utils';
import { CampaignsService } from './campaigns.service';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'campaigns';
  private emeraldsKey = 'emeralds';

  constructor(private campaignsService: CampaignsService) {
    this.initializeLocalStorage();
  }
  private initializeLocalStorage(): void {
    if (!localStorage.getItem(this.storageKey)) {
      const mockCampaigns = this.campaignsService.mockCampaigns;
      this.saveCampaigns(mockCampaigns);
    }
    if (!localStorage.getItem(this.emeraldsKey)) {
      this.setEmeralds(3000);
    }
  }
  getCampaigns(): Campaign[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  saveCampaigns(campaigns: Campaign[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(campaigns));
  }
  setCampaigns(campaigns: Campaign[]) {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }
  addCampaign(campaign: Campaign): void {
    const campaigns = this.getCampaigns();
    campaigns.push(campaign);
    this.saveCampaigns(campaigns);
  }
  updateCampaign(updatedCampaign: Campaign): void {
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex(
      (campaign) => campaign.id === updatedCampaign.id
    );

    if (index !== -1) {
      const oldCampaign = campaigns[index];
      const fundDifference = updatedCampaign.fund - oldCampaign.fund;

      if (fundDifference > 0) {
        this.decreaseEmeralds(fundDifference);
      } else if (fundDifference < 0) {
        this.increaseEmeralds(Math.abs(fundDifference));
      }

      campaigns[index] = updatedCampaign;
      this.saveCampaigns(campaigns);
    } else {
      campaigns.push(updatedCampaign);
      this.saveCampaigns(campaigns);
    }
  }
  deleteCampaign(campaignId: number): void {
    const campaigns = this.getCampaigns();
    const campaignToDelete = campaigns.find((c) => c.id === campaignId);

    if (campaignToDelete) {
      this.increaseEmeralds(campaignToDelete.fund);

      const updatedCampaigns = campaigns.filter((c) => c.id !== campaignId);
      this.saveCampaigns(updatedCampaigns);
    }
  }

  /*Emeralds */
  getEmeralds(): number {
    const emeralds = localStorage.getItem(this.emeraldsKey);
    return emeralds ? Number(emeralds) : 0;
  }

  setEmeralds(amount: number): void {
    const roundedAmount = roundToTwoDecimals(amount);
    localStorage.setItem(this.emeraldsKey, roundedAmount.toString());
  }

  decreaseEmeralds(amount: number): void {
    const currentEmeralds = this.getEmeralds();
    const newEmeralds = currentEmeralds - amount;
    const roundedEmeralds = roundToTwoDecimals(
      newEmeralds > 0 ? newEmeralds : 0
    );
    this.setEmeralds(roundedEmeralds);
  }

  increaseEmeralds(amount: number): void {
    const currentEmeralds = this.getEmeralds();
    const newEmeralds = currentEmeralds + amount;
    const roundedEmeralds = roundToTwoDecimals(newEmeralds);
    this.setEmeralds(roundedEmeralds);
  }
}
