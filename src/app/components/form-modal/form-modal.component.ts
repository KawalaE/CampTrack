import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips'; // Import for Chips
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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

  campaign = {
    name: '',
    keywords: [] as string[],
    bid: 0 as number,
    fund: 0 as number,
    town: '',
  };

  @Output() campaignCreated = new EventEmitter<{
    name: string;
    keywords: string[];
    bid: number;
    fund: number;
    town: string;
  }>();

  constructor(public dialogRef: MatDialogRef<FormModalComponent>) {}

  submit() {
    if (
      this.campaign.name &&
      this.campaign.keywords.length > 0 &&
      this.campaign.bid > 0 &&
      this.campaign.fund > 0 &&
      this.campaign.town
    ) {
      this.campaignCreated.emit(this.campaign);
      console.log(this.campaign);
      this.dialogRef.close();
    }
  }
}
