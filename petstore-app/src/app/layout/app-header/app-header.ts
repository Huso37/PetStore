import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    RouterLink
  ],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss'
})
export class AppHeaderComponent {

}
