import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FormService {
  isValidName: boolean = false;
  isValidSurname: boolean = false;
  isValidEmail: boolean = false;
  isValidTel: boolean = false;
  isValidTextArea: boolean = false;
  isvalidPrivacy: boolean = false;


  validateForm(){
    console.log("ahahaha");
  }


}
