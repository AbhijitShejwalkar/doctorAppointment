import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { MatCardModule } from '@angular/material/card';
import  { MatButtonModule } from '@angular/material/button';
import  { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,MatInputModule,MatIconModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  hide: boolean = false;

  constructor(private fb: FormBuilder,private router: Router ) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    
    this.router.navigate(['user-input']);

    console.log(this.loginForm.value);
  }

}