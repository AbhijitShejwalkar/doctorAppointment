import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import  { MatCardModule } from '@angular/material/card';
import  { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

import  { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';


@Component({
  selector: 'app-slot-booking',
  standalone: true,
  imports: [CommonModule, RouterOutlet,CommonModule,MatCardModule,MatButtonModule,MatFormFieldModule, MatInputModule,  MatDatepickerModule, MatNativeDateModule, MatIconModule, ReactiveFormsModule,RouterModule],
  templateUrl: './slot-booking.component.html',
  styleUrl: './slot-booking.component.css'
})
export class SlotBookingComponent implements OnInit {


  date = new FormControl(new Date());
  

  constructor(private fb: FormBuilder,private router: Router ) {
  }

  ngOnInit() {

    // this.myslotBookingDate = new Date();
    // let date = new Date((new Date().getTime() - 3888000000));

      
  }


  slotBookingForm: FormGroup = this.fb.group({
    slotBookingDate: ['', Validators.required],
    
  })


  onSlotBooking() {
    if (!this.slotBookingForm.valid) {
      alert()
      return;
    }
    
   // this.router.navigate(['slot-booking']);

    // refernce for table funcionality
    //https://stackblitz.com/edit/angular-n9yojx?file=src%2Fapp%2Fapp.component.ts

    console.log(this.slotBookingForm.value);
  }

}

