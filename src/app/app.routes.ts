import { Routes } from '@angular/router';
import { HomeComponent } from './screen/home/home.component';
import { StartComponent } from './screen/start/start.component';
import { LoginComponent } from './screen/login/login.component';
import { CatalogComponent } from './screen/catalog/catalog.component';
import { ContactsComponent } from './screen/contacts/contacts.component';
import { MovieDetailComponent } from './screen/catalog/movie-detail/movie-detail.component';

export const routes: Routes = [
    {'path': '',component: StartComponent},
    {'path': 'home',component: HomeComponent},
    {'path': 'login',component: LoginComponent},
    {'path': 'catalog',component: CatalogComponent},
    {'path': 'contacts',component: ContactsComponent},
    {'path': 'movie_detail',component: MovieDetailComponent},
];
