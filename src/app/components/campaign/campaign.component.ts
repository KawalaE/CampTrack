import { Component, input } from '@angular/core';
import { Campaign } from '../../model/campaign.type';

@Component({
  selector: 'app-campaign',
  imports: [],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
})
export class CampaignComponent {
  campaign = input.required<Campaign>();
}
