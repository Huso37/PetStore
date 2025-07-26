import { Routes } from '@angular/router';

import { HomeComponent } from '../app/features/home/home';
import { PetListComponent } from '../app/features/pet-list/pet-list';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pets', component: PetListComponent },
    { path: 'pets/add', loadComponent: () => import('../app/features/add-pet/add-pet').then(m => m.AddPetComponent) },
];
