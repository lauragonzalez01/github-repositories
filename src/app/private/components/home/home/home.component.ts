import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { GithubService } from '../../../../shared/services/github/github.service';
import { NgIf } from '@angular/common';
import { tap, catchError, of } from 'rxjs';
import { ErrorHandlerComponent } from '../../../../shared/components/error-handler/error-handler.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, NgIf, ErrorHandlerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showGuestInput: boolean = false;
  guestUsername: string = '';
  developerUsername: string = 'lauragonzalez01';
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private githubService: GithubService) { }

  continueAsDeveloper(): void {
    this.githubService.setUsername(this.developerUsername);
    this.loadAndNavigate(this.developerUsername);
  }

  showAsGuest() {
    this.showGuestInput = true;
  }

  continueAsGuest(): void {
    if (this.guestUsername.trim() !== '') {
      this.githubService.setUsername(this.guestUsername);
      this.loadAndNavigate(this.guestUsername);
    } else {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
    }
  }

  loadAndNavigate(username: string): void {
    this.githubService.getPublicRepositories(username).pipe(tap((repos) => {
        if (repos) {
          this.router.navigate(['/', username, 'repositorios']);
        }
      }),
      catchError((error) => {
        this.errorMessage = error.message;
        return of(null);
      })
    ).subscribe();
  }

}