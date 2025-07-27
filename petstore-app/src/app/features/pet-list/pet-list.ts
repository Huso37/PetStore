import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetService } from '../../generated/api/pet.service';
import { Pet } from '../../generated/model/pet';
import { PetDetailDialogComponent } from '../pet-detail-dialog/pet-detail-dialog';

import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPetComponent } from '../add-pet/add-pet';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatIcon
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

  constructor( ) {
    effect(() => {
      this.refreshPets();
    });
  }

  refreshPets(): void {
    const status = this.selectedStatus();
    this.petService.findPetsByStatus(status).subscribe({
      next: (data) => this.pets.set(data),
      error: (err) => console.error('Chyba pri načítaní zvierat:', err)
    });
  }

  openDetailDialog(petId: number) {
    console.log(petId);
    this.dialog.open(PetDetailDialogComponent, {
      data: petId
    });
  }

  openAddPetDialog(): void {
  const dialogRef = this.dialog.open(AddPetComponent, {
    disableClose: false,
    autoFocus: true
  }); 

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Pet added:', result);
      this.refreshPets();
    }
  });
  }


}
