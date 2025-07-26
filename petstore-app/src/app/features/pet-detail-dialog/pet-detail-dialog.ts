import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetService } from '../../generated/api/pet.service';
import { Pet } from '../../generated/model/pet';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pet-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './pet-detail-dialog.html',
  styleUrl: './pet-detail-dialog.scss'
})

export class PetDetailDialogComponent implements OnInit {
  private petService = inject(PetService);
  pet?: Pet;

  constructor(@Inject(MAT_DIALOG_DATA) public petId: number) {}

  ngOnInit() {
    this.petService.getPetById(this.petId).subscribe({
      next: (data) => (this.pet = data),
      error: (err) => console.error('Chyba načítania detailu:', err)
    });
  }
}