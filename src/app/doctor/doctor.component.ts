import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RecordService } from '.././services/records.service'

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

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DataTablesModule, HttpClientModule,
    CommonModule, RouterOutlet,CommonModule,MatCardModule,MatButtonModule,MatFormFieldModule, MatInputModule,  MatDatepickerModule, MatNativeDateModule, MatIconModule, ReactiveFormsModule,RouterModule],
  templateUrl: './doctor.component.html',
  providers: [SlotbookingService,DatePipe],
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit , AfterViewInit {
  title = 'angular17';
  data:any;
  slotBookingForm!: FormGroup;
  today =  new Date();
  maxDate!: Date;
  slotBookingData:any[] = [];
  errorMessage: string | undefined;
  paitentId:any;

  constructor(private fb: FormBuilder,private router: Router,private http: HttpClient, public recordService : RecordService, public datepipe: DatePipe, public slotbookingService: SlotbookingService){

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

  this.checkAppoinment();

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


checkAppoinment() {
  if (!this.slotBookingForm.valid) {

    return;
  }



  let latest_date = this.datepipe.transform(this.slotBookingForm.value.slotBookingDate, 'dd/MM/yyyy');
  console.log(latest_date);

  let object_data = {
      "appointment_date": latest_date
  }
  if (typeof localStorage !== 'undefined') {
  localStorage.setItem('selectedDate', this.slotBookingForm.value.slotBookingDate);
  }
  this.recordService.getRecords(object_data).subscribe((data: any) => {
    // successful_response true means user register sucessfully
    if(data.status == "success")
    {
      this.data = data.data;



    } else {
      this.data = data.data;
    }

    console.log(this.data, 'this.data')


    setTimeout(()=>{
      $('#datatableexample').DataTable( {
       destroy: true,
       pagingType: 'full_numbers',
       pageLength: 5,
       processing: true,
      //  destroy: true,
       lengthMenu : [5, 10, 25],
   } );
   }, 1);

  })

  console.log(this.slotBookingForm.value);
}



ngAfterViewInit () {

  // this.checkAppoinment()
  /*let object_data = {
    "date": '11/03/2024'
}
  this.recordService.getRecords(object_data).subscribe((data: any) => {
    // successful_response true means user register sucessfully
    if(data.status == "success")
    {
        this.data = data.data;
        console.log(this.data, 'this.data')


    } else {
        this.data = data.message;
    }

  })

  //get request from web api
  this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {

    this.data = data;
  setTimeout(()=>{
     $('#datatableexample').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu : [5, 10, 25],
  } );
  }, 2000);
        }, error => console.error(error));*/

}



}
