import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { MatCardModule } from '@angular/material/card';
import  { MatButtonModule } from '@angular/material/button';
import  { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,MatInputModule,MatIconModule, ReactiveFormsModule,RouterModule,HttpClientModule],
  templateUrl: './login.component.html',
  providers: [LoginService],
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  hide: boolean = false;

  constructor(private fb: FormBuilder,private router: Router, private loginService: LoginService ) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    phone_nuimmber: ['', [Validators.required, Validators.minLength(10)]],
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
	
	this.loginService.login(this.loginForm.value).subscribe((data) => {
		console.log(data);
	})
    
  //  this.router.navigate(['user-input']);
    console.log(this.loginForm.value);
  }

}
