import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Movie } from '../../../movie.model';
import { MovieResult } from '../../../movie.model';
import { MovieService } from '../../../movie.service';
import { environment } from '../../../environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  API_IMAGE_URL!: string;

  constructor(public movieService: MovieService) {}


  ngOnInit() {
    this.API_IMAGE_URL = environment.API_IMAGE_URL;
    this.movieService.otherMovies = [];
    this.movieService.getOtherMovie('popular', this.movieService.page);
  }

  currentOtherMovie(id:number) {
    this.movieService.selectedMovieId = id;
  }

}
