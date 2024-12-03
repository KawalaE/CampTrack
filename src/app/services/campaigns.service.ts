import { Injectable } from '@angular/core';
import { Campaign } from '../model/campaign.type';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  mockCampaigns: Campaign[] = [
    {
      id: 1001,
      productId: 1,
      name: 'Wireless campaign',
      keywords: ['launch', 'discount'],
      bid: 120,
      fund: 300,
      status: true,
      town: 'Phoenix',
      radius: 5,
    },
    {
      id: 3001,
      productId: 3,
      name: 'Gaming laptop campaign',
      keywords: ['launch'],
      bid: 140,
      fund: 300,
      status: true,
      town: 'Los Angeles',
      radius: 15,
    },
    {
      id: 3002,
      productId: 3,
      name: 'Gaming laptop clerance',
      keywords: ['sale'],
      bid: 100,
      fund: 200,
      status: true,
      town: 'Houston',
      radius: 15,
    },
  ];

  constructor() {}
}
