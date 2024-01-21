import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import  { MatCardModule } from '@angular/material/card';
import  { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import  { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import {MatDatepickerModule, MatDatepickerInputEvent} from '@angular/material/datepicker';

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


  //date = new FormControl(new Date());
  slotBookingForm!: FormGroup;
  today =  new Date();
  maxDate!: Date;

  constructor(private fb: FormBuilder,private router: Router ) {

  }

  ngOnInit() {

    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 30 )
    this.slotBookingForm = this.fb.group({
      slotBookingDate: [new Date(), Validators.required],
      
    })

  } 
  
  //Custom filter function to disbale tuesday 
  dateFilter  = (date: Date | null ) : boolean => {
    const day = ( date || new Date()).getDay();
    if(!date) {
      return false;
    }
    this.today.setHours(0,0,0,0)
    this.maxDate.setHours(0,0,0,0)
    return (day !== 2 &&  ( date >= this.today && date  <= this.maxDate)); 
    }
  

  onSlotBooking() {
    if (!this.slotBookingForm.valid) {
      alert()
      return;
    }
    
    console.log(this.slotBookingForm.value);
  }

}

