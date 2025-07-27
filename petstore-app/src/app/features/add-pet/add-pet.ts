import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { PetService } from '../../generated/api/pet.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './add-pet.html',
  styleUrl: './add-pet.scss'
})

export class AddPetComponent {
  
  categories = [
    { id: 1, name: 'Dog' },
    { id: 2, name: 'Cat' },
    { id: 3, name: 'Fish' },
    { id: 4, name: 'Bird' }
  ];

  private fb = inject(FormBuilder);
  private petService = inject(PetService);
  
  constructor(
    public dialogRef: MatDialogRef<AddPetComponent>
  ){}

  AddForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    category: [null, Validators.required],
    photoUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+$/)]]
  });

  onSubmit() {
    if (this.AddForm.valid) {
      let petData: any;
      petData = this.AddForm.getRawValue();

      petData.id = this.generateId();
      petData.photoUrls = [petData.photoUrl ?? ''];
      petData.status = 'available';
      delete petData.photoUrl;

      this.petService.addPet(petData).subscribe({
        next: (addedPet) => {
          console.log('Pet added:', addedPet);
          this.dialogRef.close(addedPet);
        },
        error: (err) => {
          console.error('Error adding pet:', err);
        }
      });
      console.log('Pet to add:', petData);
    }
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
