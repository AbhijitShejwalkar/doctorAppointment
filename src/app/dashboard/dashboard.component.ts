import { Component, OnInit,  ElementRef, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';




import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
import { MasterService } from '.././services/master.service';

import { DatePipe } from '@angular/common'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';




@Component({
  selector: 'dashboard-component',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule,
    CommonModule, RouterOutlet,CommonModule,MatCardModule,MatButtonModule,MatFormFieldModule,DataTablesModule, MatInputModule,  MatDatepickerModule, MatNativeDateModule, MatIconModule, ReactiveFormsModule,RouterModule],
  templateUrl: './dashboard.component.html',
  providers: [SlotbookingService,DatePipe,MasterService],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 constructor(private fb: FormBuilder,private http: HttpClient, public recordService : RecordService, public datepipe: DatePipe, public slotbookingService: SlotbookingService,private service: MasterService,  private router: Router) { }


  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  @ViewChild('content') popupview !: ElementRef;

  Invoiceheader: any;
  slotBookingForm!: FormGroup;
  pdfurl = '';
  invoiceno: any;
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  today =  new Date();
  maxDate!: Date;

  ngOnInit(): void {

    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 30 )
  this.slotBookingForm = this.fb.group({
    slotBookingDate: [new Date(), Validators.required],

  })


    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
      responsive:true,
    //  paging:true
    lengthChange:false,
    language:{
      searchPlaceholder:'Serach in Table record'
    }

    };
    this.LoadInvoice();
  }

  LoadInvoice() {

    if (!this.slotBookingForm.valid) {

      return;
    }


    let latest_date = this.datepipe.transform(this.slotBookingForm.value.slotBookingDate, 'dd/MM/yyyy');

  let date = {
    "appointment_date": latest_date
}

  //   let date = {
  //     "appointment_date": "17/03/2024"
  // }



    this.service.GetAllInvoice(date).subscribe((res: any) => {

      // console.log(json_paser())
      this.Invoiceheader = res.data;
     
      
      console.log(  this.Invoiceheader , '  this.Invoiceheader ');
      this.rerender()
     
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }



  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }



  Editinvoice(invoiceno: any) {
    this.router.navigateByUrl('/editinvoice/' + invoiceno);
  }
  PrintInvoice(invoiceno: any) {
    this.service.GenerateInvoicePDF(invoiceno).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  DoneAppointment(invoiceno: any) {

   let appointmentIds =  {
      "appointments": [
          {
              "appointmentId": invoiceno
          }
      ]
  }

    this.service.DoneAppointment(appointmentIds).subscribe(res => {
   
      console.log(res);
      this.LoadInvoice();

    });
  }


  CancelAppointment(invoiceno: any) {
    if (confirm('Do you want to Cancel this Appointment :' + invoiceno)) {
    let appointmentIds =  {
       "appointments": [
           {
               "appointmentId": invoiceno
           }
       ]
   }
 
     this.service.CancelAppointment(appointmentIds).subscribe(res => {
    
       console.log(res);
       this.LoadInvoice();
 
     });
  }
   }



}
