import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show: boolean = false;
  loggedIn: boolean = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, protected router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.checkIfUsernameExist(this.loginForm.get('username').value).subscribe(
      (result) => {
        if (result[0].hasOwnProperty('document')) {
          console.log("postoji");
          if (result[0].document.fields.password.stringValue == this.loginForm.get('password').value) {
            if (this.loginForm.get('password').value === localStorage.getItem('token')) {
              this.loggedIn = true;
              this.loginForm.reset();
            }
            else {
              console.log("Uspesno ulogovan");
              this.authService.setUsername(this.loginForm.get('username').value);
              sessionStorage.setItem('token', this.loginForm.get('username').value);
              this.authService.login();
              localStorage.setItem('token', this.loginForm.get('username').value);
              this.router.navigate(['/user'], { replaceUrl: true });
            }

          }
          else {
            this.show = true;
            this.loginForm.reset();
            console.log("Pogresna sifra");
          }
        }
        else {
          this.show = true;
          this.loginForm.reset();
          console.log("Korisnik ne postoji u bazi");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

