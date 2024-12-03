import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips'; // Import for Chips
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Campaign } from '../../model/campaign.type';
import { LocalStorageService } from '../../services/local-storage.service';
@Component({
  selector: 'app-form-modal',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    NgFor,
    MatSlideToggleModule,
    NgIf,
  ],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent {
  keywordSuggestions: string[] = ['discount', 'sale', 'launch'];
  localStorageService = inject(LocalStorageService);
  maxFund: number;
  campaignTowns: string[] = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
  ];

  campaign: Campaign = {
    id: 0,
    productId: 0,
    name: '',
    keywords: [],
    bid: 0,
    fund: 0,
    status: false,
    town: '',
    radius: 0,
  };

  @Output() campaignCreated = new EventEmitter<{
    name: string;
    keywords: string[];
    bid: number;
    fund: number;
    status: boolean;
    town: string;
    radius: number;
  }>();

  isEditMode: boolean = false;
  @Output() campaignDeleted = new EventEmitter<number>();

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { productId: number; campaign?: Campaign }
  ) {
    if (data.campaign) {
      this.campaign = { ...data.campaign };
      this.isEditMode = true;
      this.maxFund = this.getMaxFund();
    } else {
      this.campaign.productId = data.productId;
      this.maxFund = this.getMaxFund();
    }
  }
  getMaxFund(): number {
    if (this.isEditMode) {
      return this.campaign.fund + this.localStorageService.getEmeralds();
    }
    return this.localStorageService.getEmeralds();
  }
  removeKeyword(index: number): void {
    const updatedKeywords = [...this.campaign.keywords];
    updatedKeywords.splice(index, 1);
    this.campaign.keywords = updatedKeywords;
  }

  deleteCampaign(): void {
    this.campaignDeleted.emit(this.campaign.id);
    this.dialogRef.close();
  }
  submit() {
    if (
      this.campaign.name &&
      this.campaign.keywords.length > 0 &&
      this.campaign.bid > 10 &&
      this.campaign.fund <= this.getMaxFund() &&
      this.campaign.town &&
      this.campaign.radius
    ) {
      this.campaignCreated.emit(this.campaign);

      this.dialogRef.close();
    }
  }
}
