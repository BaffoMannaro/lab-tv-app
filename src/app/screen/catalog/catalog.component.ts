import { Component, ElementRef, HostListener } from '@angular/core';
import { MovieService } from '../../movie.service';
import { Movie} from '../../movie.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../environment';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    MovieListComponent,
    FormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})

export class CatalogComponent {
  popularMovies!: Movie;
  public indexMovie: number = 0;
  API_IMAGE_URL!: string;

  isSearch: boolean = true;
  searchKey: string = '';


  constructor(public movieService: MovieService, private elementRef: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onHostScroll(event: Event) {
    const host = this.elementRef.nativeElement;
    const totalHeight = host.scrollHeight;
    const scrollTop = host.scrollTop;
    
    if (scrollTop + host.clientHeight >= totalHeight && this.movieService.isSearch) {
      this.movieService.page ++;
      this.movieService.getOtherMovie('popular', this.movieService.page);
    }
  }


  ngOnInit() {
    this.API_IMAGE_URL = environment.API_IMAGE_URL;
    this.getMovies('popular', 1);
    this.movieService.isSearch = true;
  }

  getMovies(data:string, page:number) {
    this.movieService.getMovies(data,page).subscribe((movieResponse) => {
      this.popularMovies = movieResponse;
    })
  }

  changeMovie(n:number) {
    if ( n === 1 ){
      if (this.indexMovie > 0){
        this.indexMovie -= 1;
      }
    } else if ( n === 2 ){
      if (this.indexMovie >= 0 && this.indexMovie < 18){
        this.indexMovie += 1;
      }
    }
  }

  currentMovie(i:number){
    this.movieService.selectedMovieId = this.popularMovies.results[i].id;
  }

  toggleIsSearch(){
    if(this.searchKey !== ''){
      this.movieService.isSearch = false;
    }
  }

  searchMovie(){
    console.log(this.searchKey)
    if(this.searchKey !== ''){
      this.movieService.getSearchMovie(this.searchKey, 1);
      this.movieService.getOtherMovie(this.searchKey, 1);
    }
    
  }

}