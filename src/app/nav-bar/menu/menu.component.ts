import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isOnOffActive = false;
  ButtonActive!: number;
  isButtonInsite = false;

  toggleOnOff(){
    this.isOnOffActive = !this.isOnOffActive;
    this.isButtonInsite = !this.isButtonInsite;
    this.ButtonActive = 0;
  };

  toggleButtonActive(i: number){
    this.ButtonActive = i;
  }
}
