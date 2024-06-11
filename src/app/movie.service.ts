import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { Movie, MovieResult } from "./movie.model";
import { environment } from "./environment";
import { MovieDetails } from "./movie-detail.model";
import { MovieCredits } from "./movie-credits.model";
import { MovieSimilar } from "./movie-similar.model";
import { MovieTrailer } from "./movie-trailer.model";


@Injectable({
  providedIn: 'root',
})

export class MovieService {
  selectedMovie!: MovieResult;
  selectedMovieId!: number;
  page: number = 2;
  otherMovies: MovieResult[] = [];

  isSearch: boolean = true;


  constructor(private httpClient: HttpClient) {}

  getMovies(data: string, page:number): Observable<Movie> {
   return this.httpClient
   .get<Movie>(`${environment.API_URL}/movie/${data}?api_key=${environment.API_KEY}&language=it&page=${page}`);
  };

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    return this.httpClient
    .get<MovieDetails>(`${environment.API_URL}/movie/${movieId}?api_key=${environment.API_KEY}&language=it`);
  }

  getMovieCredits(movieId: number): Observable<MovieCredits> {
    return this.httpClient
    .get<MovieCredits>(`${environment.API_URL}/movie/${movieId}/credits?api_key=${environment.API_KEY}&language=it`);
  }

  getMovieSimilar(movieId: number): Observable<MovieSimilar> {
    return this.httpClient
    .get<MovieSimilar>(`${environment.API_URL}/movie/${movieId}/similar?api_key=${environment.API_KEY}&language=it`);
  }

  getMovieTrailer(movieId: number): Observable<MovieTrailer> {
    return this.httpClient
    .get<MovieTrailer>(`${environment.API_URL}/movie/${movieId}/videos?api_key=${environment.API_KEY}&language=it`);
  }

  getOtherMovie(data:string, page: number){
    if (this.isSearch === true) {
      this.getMovies(data,page).subscribe((otherMovies) => {
        this.otherMovies = this.otherMovies.concat(otherMovies.results);
      })
    } else {
      this.getSearchMovie(data,page).subscribe((searchMovie) => {
        this.otherMovies = searchMovie.results;
      })
    }
  }

  getSearchMovie(name:string, page: number): Observable<Movie>{
    return this.httpClient
    .get<Movie>(`${environment.API_URL}/search/movie?query=${name}&api_key=${environment.API_KEY}&language=it&page=${page}`);
   };

   ////////////////////////////////////////////////////////////////

   getUsers(): Observable<any[]>{
    return this.httpClient
    .get<any[]>(`${environment.API_LOGIN_URL}/users`);
   }
}