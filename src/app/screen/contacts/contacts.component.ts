import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormService } from '../../form.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  validateForm(i:number) {
    console.log(i);
  }

}
