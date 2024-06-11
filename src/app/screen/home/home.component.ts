import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  firstStart: string = "<p>Ti invito a <span>'cambiare canale' premendo sul pulsante login.</p><p>In questo modo potro' conoscerti meglio e consigliarti i film e le serie televisive che potrebbero piacerti di piu'.</p>";
  lastArrived: string = "<p>Gli ultimi arrivi</p>";
  subtitles: string = "<p>Seleziona la lingua</p>";
  faq: string = "<p>Qui risponderemo alle FAQ</p>";
  parentalControl: string = "<p>Imposta il Parental Control</p>";
  privatePolicy: string = "<p>Leggi la nostra Private Policy</p>";
  cookiePolicy: string = "<p>Leggi la nostra Cookie Policy</p>";
  credits: string = "<p>Mauro Altamura ;) <br><br> Febbraio 2024</p>";

  details: string = this.firstStart;
  activeButton: number = 7; //numero dello start del menu del televideo

  changeDetails(campoX:string, n:number) {
    this.details = campoX;
    this.activeButton = n;
  }

}
