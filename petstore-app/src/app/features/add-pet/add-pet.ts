import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { PetService } from '../../generated/api/pet.service';
import { Router } from '@angular/router';
import { Pet } from '../../generated/model/pet';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './add-pet.html',
  styleUrl: './add-pet.scss'
})

export class AddPetComponent {
  private fb = inject(FormBuilder);
  private petService = inject(PetService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    status: ['available', Validators.required],
    category: this.fb.group({
      id: [0],
      name: ['']
    }),
    photoUrls: this.fb.array([this.fb.control('')])
  });

  onSubmit() {
  if (this.form.valid) {
    const raw = this.form.getRawValue();

    const payload: Pet = {
      id: 0, // alebo necháš backend určiť
      name: raw.name || '',
      status: raw.status as 'available' | 'pending' | 'sold',
      category: {
        id: raw.category?.id ?? undefined,    // konverzia null → undefined
        name: raw.category?.name ?? undefined
        },
      photoUrls: raw.photoUrls?.filter(Boolean) as string[],
      tags: [] // voliteľné, alebo prázdne
    };

    this.petService.addPet(payload).subscribe({
      next: () => this.router.navigate(['/pets']),
      error: (err) => console.error('Chyba pri pridávaní:', err)
    });
  }
}
}
