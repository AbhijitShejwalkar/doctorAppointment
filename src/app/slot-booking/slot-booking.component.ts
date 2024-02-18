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
import { SlotbookingService } from '../services/slotbooking.service';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-slot-booking',
  standalone: true,
  imports: [CommonModule, RouterOutlet,CommonModule,MatCardModule,MatButtonModule,MatFormFieldModule, MatInputModule,  MatDatepickerModule, MatNativeDateModule, MatIconModule, ReactiveFormsModule,RouterModule],
  templateUrl: './slot-booking.component.html',
  providers: [SlotbookingService,DatePipe],
  styleUrl: './slot-booking.component.css'
})
export class SlotBookingComponent implements OnInit {


  //date = new FormControl(new Date());
  slotBookingForm!: FormGroup;
  today =  new Date();
  maxDate!: Date;
  slotBookingData:any[] = [];
  errorMessage: string | undefined;
  constructor(private fb: FormBuilder,private router: Router, private slotbookingService: SlotbookingService, public datepipe: DatePipe ) {

  }

  ngOnInit() {

    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 30 )
    this.slotBookingForm = this.fb.group({
      slotBookingDate: [new Date(), Validators.required],

    })

    this.onSlotBooking();

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

      return;
    }



    let latest_date = this.datepipe.transform(this.slotBookingForm.value.slotBookingDate, 'dd/MM/yyyy');
    console.log(latest_date);

    let object_data = {
        "date": latest_date
    }
    localStorage.setItem('selectedDate', this.slotBookingForm.value.slotBookingDate);
    this.slotbookingService.slotBooking(object_data).subscribe((data: any) => {
      // successful_response true means user register sucessfully
      if(data.status == "success")
      {
          this.slotBookingData = data.data;


      } else {
          this.errorMessage = data.message;
      }

    })

    console.log(this.slotBookingForm.value);
  }


  bookAppointment(slot_time:any,appointment_date:any) {

    let selectedDate = localStorage.getItem('selectedDate');
    let selectedDateFomrated = this.datepipe.transform(selectedDate, 'dd/MM/yyyy');
    alert(selectedDateFomrated);
    alert(slot_time);

    let input_object  = {
      "patient_phone_number": localStorage.getItem('sessionPhoneNumber'),
      "appointment_date": selectedDateFomrated,
      "slot_time": slot_time
  }

  console.log(input_object)

    this.slotbookingService.bookAppointment(input_object).subscribe((data: any) => {
      // successful_response true means user register sucessfully
      if(data.status == "success")
      {
          // this.slotBookingData = data.data;
          // localStorage.setItem('selectedDate', this.slotBookingForm.value.slotBookingDate);

      } else {
          // this.errorMessage = data.message;
      }

    })
  }




}

