import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import  { MatCardModule } from '@angular/material/card';
import  { MatButtonModule } from '@angular/material/button';
import  { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';


@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [CommonModule, RouterOutlet,CommonModule,MatCardModule,MatButtonModule,MatInputModule,MatIconModule, ReactiveFormsModule,RouterModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent implements OnInit {

  constructor(private fb: FormBuilder,private router: Router ) {
  }

  ngOnInit() {
  }


  userInputForm: FormGroup = this.fb.group({
    patientName: ['', [Validators.required, Validators.maxLength(100)]],
  })


  onUserInput() {
    if (!this.userInputForm.valid) {
      return;
    }
    
    this.router.navigate(['slot-booking']);

    console.log(this.userInputForm.value);
  }

}
