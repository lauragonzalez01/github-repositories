import { Injectable } from '@angular/core';
import { githubRepositories } from '../../models/github-repositories.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { HandleErrorService } from '../http/handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _currentUsername = new BehaviorSubject<string | null>(null);
  public currentUsername$ = this._currentUsername.asObservable();

  constructor(private http: HttpClient, private handleError: HandleErrorService) { }

  setUsername(username: string): void {
    localStorage.setItem("username", username);
    this._currentUsername.next(username);
  }

  getPublicRepositories(username: string): Observable<githubRepositories[]> {
    if (!username || username.trim() === '') {
      return of([]);
    }
    const url = `https://api.github.com/users/${username}/repos`;
    return this.http.get<githubRepositories[]>(url).pipe(
      catchError((error) => this.handleError.handleHttpError(error, username)));
  }
}