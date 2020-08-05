import { Component, OnInit } from '@angular/core';
import { loginService } from './../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'Login';
  loginForm: FormGroup;

  constructor(private loginService: loginService) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

  }

  onSubmit(){
    this.loginService.login(this.loginForm.value).subscribe(a =>{
      console.log(a);
    });
  }
}
