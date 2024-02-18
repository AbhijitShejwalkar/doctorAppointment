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
import { UserinputService } from '../services/userinput.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [CommonModule, RouterOutlet,CommonModule,MatCardModule,MatButtonModule,MatInputModule,MatIconModule, ReactiveFormsModule,RouterModule],
  templateUrl: './user-input.component.html',
  providers: [UserinputService],
  styleUrl: './user-input.component.css'
})
export class UserInputComponent implements OnInit {

  constructor(private fb: FormBuilder,private router: Router, private userinputService: UserinputService  ) {
  }

  sessionPhoneNumberValue:any;
  ipid:string | undefined;

  ngOnInit() {
    this.sessionPhoneNumberValue = localStorage.getItem('sessionPhoneNumber')
    this.ipid  = '192.168.77';
    alert(this.sessionPhoneNumberValue)
  }



  userInputForm: FormGroup = this.fb.group({
    patient_name: ['', [Validators.required, Validators.maxLength(100)]],
    phone_number: [''],
    patient_device_ip:['']
  })


  onUserInput() {
    if (!this.userInputForm.valid) {
      return;
    }


    this.userinputService.userInput(this.userInputForm.value).subscribe((data: any) => {
      // successful_response true means user register sucessfully
      if(data.successful_response == true)
      {
        this.router.navigate(['/slot-booking']);
      }

    })


  }

}
