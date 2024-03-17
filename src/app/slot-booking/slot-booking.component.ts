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
import { SlotbookingService } from '.././services/slotbooking.service'
import { DatePipe } from '@angular/common'
import { LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY } from '@angular/cdk/a11y';


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
  paitentId:any;
  selectedDateInfo:any;
  constructor(private fb: FormBuilder,private router: Router, private slotbookingService: SlotbookingService, public datepipe: DatePipe ) {

  }

  ngOnInit() {

    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 30 )
    this.slotBookingForm = this.fb.group({
      slotBookingDate: [new Date(), Validators.required],

    })

    

    if (typeof localStorage !== 'undefined') {
      this.paitentId =(localStorage.getItem('patient_id') || '""' );

      console.log((localStorage.getItem('patient_id') || '""' ));
      // rest of the code ...
    }

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
    this.selectedDateInfo = latest_date
    if (typeof localStorage !== 'undefined') {
    localStorage.setItem('selectedDate', this.slotBookingForm.value.slotBookingDate);
    }
    this.slotbookingService.slotBooking(object_data).subscribe((data: any) => {
      // successful_response true means user register sucessfully
      if(data.status == "success")
      {
        const today = new Date();
        const inputDate = new Date(this.slotBookingForm.value.slotBookingDate);
        today.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);
        // Check if the two dates are equal.
        if (today.getTime() === inputDate.getTime()) {
          this.slotBookingData = this.filterSlotsByCurrentDateTime(data.data);
          console.log(this.slotBookingData, 'this.slotBookingData')
        } else {
          this.slotBookingData =  data.data
        }
      } else {
          this.errorMessage = data.message;
          
      }

    })

    console.log(this.slotBookingForm.value);
  }


  bookAppointment(slot_time:any) {

    if (typeof localStorage !== 'undefined') {
      let selectedDate = localStorage.getItem('selectedDate');

    let selectedDateFomrated = this.datepipe.transform(selectedDate, 'dd/MM/yyyy');
   // alert(selectedDateFomrated);
    //alert(slot_time);

    let input_object  = {
      "patient_id": this.paitentId,
      "appointment_date": selectedDateFomrated,
      "slot_time": slot_time
  }


  console.log(input_object)

    this.slotbookingService.bookAppointment(input_object).subscribe((data: any) => {
      // successful_response true means user register sucessfully
      if(data.status == "success")
      {
            alert("Apoointment Booked succesfully for Date "+selectedDateFomrated+" at "+ slot_time )
            this.onSlotBooking();
           // this.slotBookingData = data.data;
          // localStorage.setItem('selectedDate', this.slotBookingForm.value.slotBookingDate);

      } else {
          this.errorMessage = data.error.message;
          alert(this.errorMessage);
      }

    })
  }
  }



   filterSlotsByCurrentDateTime(datas:any) {
    const currentTime = new Date();

    return datas.filter((slot: { slotTime: string; }) => {
        const slotDateTimeParts = slot.slotTime.split(' ');
        const slotTime = new Date(currentTime.toDateString() + ' ' + slotDateTimeParts[0] + ' ' + slotDateTimeParts[1]);

        // Compare date first
        if (slotTime.toDateString() === currentTime.toDateString()) {
            // If date matches, compare time
            return slotTime > currentTime;
        } else {
            // If date doesn't match, slot is for a future date
            return false;
        }
    });
}



  /*

  
    const datas = [
      {
          "slotId": 1,
          "tokenNumber": 100,
          "slotTime": "10:00 am"
      },
      {
          "slotId": 3,
          "tokenNumber": 102,
          "slotTime": "10:10 am"
      },
       {
          "slotId": 4,
          "tokenNumber": 102,
          "slotTime": "02:15 pm"
      }
  ];
  
  function filterSlotsByCurrentTime(datas:any) {
      const currentTime = new Date();
      console.log(currentTime);
      return datas.filter((slot: { slotTime: string; }) => {
          const slotTimeParts = slot.slotTime.split(' ');
          const slotTime = new Date(currentTime.toDateString() + ' ' + slotTimeParts[0] + ' ' + slotTimeParts[1]);
  
  
          return slotTime > currentTime;
      });
  }
  
  const filteredSlots = filterSlotsByCurrentTime(datas);
  console.log(filteredSlots);
  



  */



}

