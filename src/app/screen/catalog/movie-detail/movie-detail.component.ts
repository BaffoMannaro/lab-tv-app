import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Movie, MovieResult } from '../../../movie.model';
import { MovieService } from '../../../movie.service';
import { CatalogComponent } from '../catalog.component';
import { environment } from '../../../environment';
import { MovieDetails } from '../../../movie-detail.model';
import { Cast, MovieCredits } from '../../../movie-credits.model';
import { MovieSimilar } from '../../../movie-similar.model';
import { MovieTrailer } from '../../../movie-trailer.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule,CatalogComponent,RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  movies!: Movie;
  selectedMovie!: MovieDetails;
  API_IMAGE_URL!: string;

  movieCredits!: MovieCredits;
  movieDirector!: Cast; 
  movieCast: Cast[] = [];
  movieCrew: Cast[] = [];

  isCastVisible: boolean = false;
  isVideoOk: boolean = false;

  movieSimilar!: MovieSimilar;
  movieTrailer!: MovieTrailer;
  videoKey!: string;

  constructor(private movieService: MovieService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.API_IMAGE_URL = environment.API_IMAGE_URL;
    this.getMovieDetails(this.movieService.selectedMovieId);
    this.getMovieCredits(this.movieService.selectedMovieId);
    this.getMovieSimilar(this.movieService.selectedMovieId);
    this.getMovieTrailer(this.movieService.selectedMovieId);
  }

  getMovieDetails(movieId: number) {
    this.movieService.getMovieDetails(movieId).subscribe((movieDetails) => {
      this.selectedMovie = movieDetails
    })
  }

  getMovieCredits(movieId: number) {
    this.movieService.getMovieCredits(movieId).subscribe((movieCredits) => {
      this.movieCredits = movieCredits;
      this.movieCast = movieCredits.cast;
      this.movieCrew = movieCredits.crew;

      for (let i = 0; i < this.movieCrew.length; i++) {
        if (this.movieCrew[i].job === 'Director') {
          this.movieDirector = this.movieCrew[i];
        }
      }
      this.movieCast.unshift(this.movieDirector);
    })
  }

  toggleCastVisible() { this.isCastVisible = !this.isCastVisible; }
  toggleVideo() { this.isVideoOk = !this.isVideoOk; }

  getMovieSimilar(movieId: number) {
    this.movieService.getMovieSimilar(movieId).subscribe((movieSimilar) => {
      this.movieSimilar = movieSimilar;
    })
  }

  getMovieTrailer(movieId: number) {
    this.movieService.getMovieTrailer(movieId).subscribe((movieTrailer) => {
      this.movieTrailer = movieTrailer;
      this.videoKey = movieTrailer.results[0].key;
      this.getSafeVideoUrl();
    });
  }

  getSafeVideoUrl(): SafeResourceUrl | undefined{
    if (this.videoKey) {
      const videoUrl = `https://www.youtube.com/embed/${this.videoKey}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
    return undefined
  }

}
