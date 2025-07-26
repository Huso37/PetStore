import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetService } from '../../generated/api/pet.service';
import { Pet } from '../../generated/model/pet';
import { PetDetailDialogComponent } from '../pet-detail-dialog/pet-detail-dialog';

import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss'
})

export class PetListComponent {
  private petService = inject(PetService);
  private dialog = inject(MatDialog);

  statuses = ['available', 'pending', 'sold'] as const;

  selectedStatus = signal<'available' | 'pending' | 'sold'>('available');
  pets = signal<Pet[]>([]);

  displayedColumns = ['id', 'name', 'status', 'category', 'photo'];

  constructor() {
    effect(() => {
      const status = this.selectedStatus();
      this.petService.findPetsByStatus(status).subscribe({
        next: (data) => this.pets.set(data),
        error: (err) => console.error('Chyba pri načítaní zvierat:', err)
      });
    });
  }

  openDetailDialog(petId: number) {
  this.dialog.open(PetDetailDialogComponent, {
    data: petId
  });
  }
}
