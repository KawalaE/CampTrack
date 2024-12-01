import { NgFor } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

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
  ],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent {
  keywordSuggestions: string[] = [
    'Marketing',
    'Promotion',
    'Discount',
    'Sale',
    'Launch',
  ];
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

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number }
  ) {
    this.campaign.productId = data.productId;
  }

  submit() {
    if (
      this.campaign.name &&
      this.campaign.keywords.length > 0 &&
      this.campaign.bid > 0 &&
      this.campaign.fund > 0 &&
      this.campaign.town &&
      this.campaign.radius
    ) {
      this.campaignCreated.emit(this.campaign);
      console.log(this.campaign);
      this.dialogRef.close();
    }
  }
}
