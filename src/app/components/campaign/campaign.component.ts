import { Component, inject, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Campaign } from '../../model/campaign.type';
import { LocalStorageService } from '../../services/local-storage.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FormModalComponent } from '../form-modal/form-modal.component';
@Component({
  selector: 'app-campaign',
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
})
export class CampaignComponent {
  @Input() campaign!: Campaign;
  localStorageService = inject(LocalStorageService);

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
    dialogRef.componentInstance.campaignDeleted.subscribe((campaignId) => {
      this.openConfirmationDialog().subscribe((confirmed) => {
        if (confirmed) {
          this.deleteCampaign(campaignId);
        }
      });
    });
  }

  deleteCampaign(campaignId: number): void {
    this.localStorageService.deleteCampaign(campaignId);
    console.log(`Campaign with ID ${campaignId} deleted.`);
  }

  openConfirmationDialog(): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Campaign',
        message: `Are you sure you want to delete the campaign "${this.campaign.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteCampaign(this.campaign.id);
      }
    });
    return dialogRef.afterClosed();
  }
}
