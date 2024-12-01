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
      keywords: ['sale', 'black friday', 'electronics'],
      bid: 120,
      fund: 300,
      status: true,
      town: 'Warsaw',
      radius: 5,
    },
    {
      id: 3001,
      productId: 3,
      name: 'Gaming laptop campaign',
      keywords: ['sale', 'laptop', 'black friday', 'electronics'],
      bid: 140,
      fund: 300,
      status: true,
      town: 'Krakow',
      radius: 15,
    },
    {
      id: 3002,
      productId: 3,
      name: 'Gaming laptop campaign - black week',
      keywords: ['sale', 'laptop', 'black friday', 'electronics'],
      bid: 140,
      fund: 300,
      status: true,
      town: 'Krakow',
      radius: 15,
    },
  ];

  constructor() {}
}
