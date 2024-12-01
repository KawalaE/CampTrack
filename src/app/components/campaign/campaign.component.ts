import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Campaign } from '../../model/campaign.type';
import { FormModalComponent } from '../form-modal/form-modal.component';
@Component({
  selector: 'app-campaign',
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
})
export class CampaignComponent {
  @Input() campaign!: Campaign;
  localStorageService: any;

  constructor(private matDialog: MatDialog) {}

  openEditDialog(): void {
    const dialogRef = this.matDialog.open(FormModalComponent, {
      width: '350px',
      data: {
        campaign: { ...this.campaign },
      },
    });
    dialogRef.componentInstance.campaignCreated.subscribe((updatedCampaign) => {
      this.campaign = { ...this.campaign, ...updatedCampaign };
      this.localStorageService.updateCampaign(this.campaign);
      console.log('Dialog closed', this.campaign);
    });
  }
}
