import { Component, OnInit } from '@angular/core';
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

  classFormCorrect: string = '';
  nickname: string = '';
  emailValid: boolean = false;
  passwordValid: boolean = false;
  nameValid: boolean = false;
  passwordRValid: boolean = false;
  privacyValid: boolean = false;
  surnameValid: boolean = false;
  telValid: boolean = false;
  textareaValid: boolean = false;


  constructor(public movieService: MovieService) {}

  getUsers() {
    this.movieService.getUsers().subscribe((userResponse) => {
      this.userResponse = userResponse;
    })
  }

  toggleIsActive() {
    this.isActive = !this.isActive;
  }

  ngOnInit(): void {
    this.initializeFormValidation();
  }

  initializeFormValidation(): void {
    $("li#nuovoAccount form").submit((event) => {
      event.preventDefault();
      this.selectedForm(1);
      this.submit(1);
    });
  }

  submit(campoX: number): void {
    if (this.isValidForm(campoX)) {
      this.eureca(campoX);
    }
  }

  selectedForm(campoX: number): void {
    // inizializza variabili del form in validazione
    if (campoX === 0) {
      // ...
    } else if (campoX === 1) {
      const inputName = $("input#newName");
      const inputEmail = $("input#newEmail");
      const inputPassword = $("input#passwordNew");
      const inputPrivacy = $("#nuovoAccount input#privacy");

      this.classFormCorrect = "formCorrect1";

      const nameValid = this.isValidName(inputName);
      const emailValid = this.isValidEmail(inputEmail);
      const passwordValid = this.isValidPassword(inputPassword);
      const passwordRValid = this.isValidPasswordR();
      const privacyValid = this.isValidPrivacy(inputPrivacy);

      // ...
    } else if (campoX === 2) {
      // ...
    }
  }

  isValidForm(campoX: number): boolean {
    if (campoX === 0) {
      return this.emailValid && this.passwordValid;
    } else if (campoX === 1) {
      return this.nameValid && this.emailValid && this.passwordValid && this.passwordRValid && this.privacyValid;
    } else if (campoX === 2) {
      return this.nameValid && this.surnameValid && this.emailValid && this.telValid && this.textareaValid && this.privacyValid;
    }
    return false;
  }

  isValidName(inputElement: JQuery<HTMLElement>): boolean {
    const inseredValue = (inputElement.val() as string).trim();
    const regexName = /^[A-Za-z\s]{1,20}$/;

    if (!regexName.test(inseredValue)) {
      if (inputElement.next().length === 0) {
        inputElement.addClass("inputError");
        const error = $("<div>").text("Inserisci da 2 a 20 caratteri").addClass("errorBox");
        inputElement.after(error);
      }
    } else {
      inputElement.removeClass("inputError");
      inputElement.next().remove();
      this.nickname = inseredValue; // salvo il nickname per personalizzazione
    }

    return regexName.test(inseredValue);
  }

  isValidEmail(inputElement: JQuery<HTMLElement>): boolean {
    const inseredValue = (inputElement.val() as string).trim();
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(inseredValue)) {
      if (inputElement.next().length === 0) {
        inputElement.addClass("inputError");
        const error = $("<div>").text("Inserisci un'indirizzo mail valido").addClass("errorBox");
        inputElement.after(error);
      }
    } else {
      inputElement.removeClass("inputError");
      inputElement.next().remove();
    }

    return regexEmail.test(inseredValue);
  }

  isValidPassword(inputElement: JQuery<HTMLElement>): boolean {
    const inseredValue = (inputElement.val() as string).trim();
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-_=+[\]{};:'",.<>/?]{8,}$/;

    if (!regexPassword.test(inseredValue)) {
      if (inputElement.next().length === 0) {
        inputElement.addClass("inputError");
        const ulError = $("<ul>").addClass("errorBox");
        const liError = $("<li>").text("inserisci una password con almeno:");
        const error1 = $("<li>").text("8 caratteri");
        const error2 = $("<li>").text("una lettera maiuscola");
        const error3 = $("<li>").text("un numero");
        inputElement.after(ulError);
        $("ul.errorBox").append(liError, error1, error2, error3);
      }
    } else {
      inputElement.removeClass("inputError");
      inputElement.next().remove();
    }

    return regexPassword.test(inseredValue);
  }

  isValidPasswordR(): boolean {
    const inputPasswordR = $("input#passwordNewR");
    const password = $("input#passwordNew").val() as string;
    const passwordR = inputPasswordR.val() as string;

    if (password !== "" && password === passwordR) {
      inputPasswordR.removeClass("inputError");
      inputPasswordR.next().remove();
      return true;
    } else {
      if (inputPasswordR.next().length === 0) {
        inputPasswordR.addClass("inputError");
        const error = $("<div>").text("Le due password devono corrispondere").addClass("errorBox");
        inputPasswordR.after(error);
      }
      return false;
    }
  }

  isValidPrivacy(inputElement: JQuery<HTMLElement>): boolean {
    if (inputElement.prop("checked") && inputElement.nextAll().eq(1).length === 0) {
      return true;
    } else if (inputElement.prop("checked") && inputElement.nextAll().eq(1).length > 0) {
      inputElement.removeClass("inputError");
      inputElement.nextAll().eq(1).remove();
      return true;
    } else if (!inputElement.prop("checked") && inputElement.nextAll().eq(1).length === 0) {
      inputElement.addClass("inputError");
      const error = $("<div>").text("Questo campo è obbligatorio").addClass("errorBox");
      inputElement.next().after(error);
    }
    return false;
  }

  eureca(campoX: number): void {
    let formCorrect: JQuery<HTMLElement>;
    if (campoX === 0) {
      formCorrect = $("<div>").text("Accesso effettuato, sarai indirizzato a breve alla tua home-page").addClass(this.classFormCorrect);
      $("#login > ol > li:nth-child(3) > ul > li.active").append(formCorrect);
      this.loadingHome();
    } else if (campoX === 1) {
      formCorrect = $("<div>").text(`Benvenuto ${this.nickname}, sarai indirizzato a breve alla home-page`).addClass(this.classFormCorrect);
      $("#login > ol > li:nth-child(3) > ul > li.active").append(formCorrect);
      this.loadingHome();
    } else if (campoX === 2) {
      formCorrect = $("<div>").text("Messaggio inviato con successo").addClass(this.classFormCorrect);
      const buttonCloseForm = $("<span>").text("Invia un altro messaggio").addClass("buttonCloseForm");
      $('#contatti form').append(formCorrect).append(buttonCloseForm);

      buttonCloseForm.click(() => {
        this.resetInput();
        buttonCloseForm.remove();
      });
    }
  }

  resetInput(): void {
    if ($(`div.${this.classFormCorrect}`).length > 0) {
      $(`div.${this.classFormCorrect}`).remove();
    }
    if ($(".errorBox").length > 0) {
      $(".errorBox").remove();
      $(".inputError").removeClass("inputError");
    }
    $("form input").val("");
    $("textarea").val("");
    $("form input[type='checkbox']").prop('checked', false);
  }

  loadingHome(): void {
    // Implementa la logica di caricamento della home-page
  }

}