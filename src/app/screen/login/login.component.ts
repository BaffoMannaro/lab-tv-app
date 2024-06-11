import { Component } from '@angular/core';
import { MovieService } from '../../movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userResponse!: any;
  isActive: boolean = false;

  constructor(public movieService: MovieService) {}


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.movieService.getUsers().subscribe((userResponse) => {
      this.userResponse = userResponse;
    })
  }

  toggleIsActive() {
    this.isActive = !this.isActive;
  }

}
