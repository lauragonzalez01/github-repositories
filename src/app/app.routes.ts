import { Routes } from '@angular/router';
import { HomeComponent } from './private/components/home/home/home.component';
import { RepositoriesComponent } from './private/components/repositories/repositories.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' }, 
    { path: ':username/repositorios', component: RepositoriesComponent }, 
    { path: '**', redirectTo: '', pathMatch: 'full' }, 
];