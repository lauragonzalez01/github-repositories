import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'github-repositories';

  constructor(public router: Router) { }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
