import { Component, OnInit } from '@angular/core'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf, NgFor } from '@angular/common';
import { githubRepositories } from '../../../shared/models/github-repositories.model';
import { GithubService } from '../../../shared/services/github/github.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ErrorHandlerComponent } from '../../../shared/components/error-handler/error-handler.component';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [MatCardModule, NgIf, NgFor, MatProgressBarModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatPaginatorModule, FormsModule, ErrorHandlerComponent],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
})
export class RepositoriesComponent implements OnInit {

  repositories: githubRepositories[] = []; 
  loading: boolean = false;
  username: any;
  totalRepositories: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  dataRepositories: githubRepositories[] = [];
  searchText: string = '';
  selectedLanguage: string = '';
  languajesList: string[] = [];
  starFilter: number | null = null;
  errorMessage: string = '';

  constructor(private githubService: GithubService, private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.loadRepositories(this.username);
  }

  loadRepositories(username: string): void {
    this.loading = true;
    this.githubService.getPublicRepositories(username).subscribe(
      (response: any) => {
        this.loading = false;
        this.repositories = response;
        this.extractUniqueLanguages(this.repositories);
        this.filterAndPaginateRepositories(this.repositories);
      }, (err) => {
        this.loading = false;
        this.errorMessage = err.message;
        console.error("Error al cargar los repositorios:", err);
      }
    );
  }

  extractUniqueLanguages(repositories: githubRepositories[]): void {
    this.languajesList = [...new Set(repositories.map((repo) => repo.language).filter((lang) => !!lang))].sort();
  }

  applyFilter(event: any): void {
    this.searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterAndPaginateRepositories(this.repositories);
  }

  filterByLanguage(event: any): void {
    this.selectedLanguage = event.value;
    this.filterAndPaginateRepositories(this.repositories);
  }

  filterByStars(event: any): void {
    const value = event.target.value;
    this.starFilter = value === '' ? null : parseInt(value, 10);
    this.filterAndPaginateRepositories(this.repositories);
  }

  filterRepositories(repositories: githubRepositories[]): githubRepositories[] {
    return repositories.filter((repo) => {
      const searchMatch =
        !this.searchText ||
        repo.name.toLowerCase().includes(this.searchText) ||
        (repo.description && repo.description.toLowerCase().includes(this.searchText));
      const languageMatch = !this.selectedLanguage || repo.language === this.selectedLanguage;
      const starsMatch = this.starFilter === null || repo.stargazers_count >= this.starFilter;
      return searchMatch && languageMatch && starsMatch;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedRepositories(this.filterRepositories(this.repositories));
  }

  updatePaginatedRepositories(filteredRepositories: githubRepositories[]): void {
    this.totalRepositories = filteredRepositories.length;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataRepositories = filteredRepositories.slice(startIndex, endIndex);
  }

  filterAndPaginateRepositories(allRepositories: githubRepositories[]): void {
    const filtered = this.filterRepositories(allRepositories);
    this.updatePaginatedRepositories(filtered);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}