import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '.././loader/loader.service';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  url = 'http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/'
  constructor(private http: HttpClient,private loaderService: LoaderService) { 

    
  }

  GetCustomer() {
    // return this.http.get('https://localhost:7118/Customer/GetAll');
    return this.http.get('https://dummyjson.com/products');
  }
  GetCustomerbycode(code: any) {
    return this.http.get('https://localhost:7118/Customer/GetByCode?Code='+code);
  }
  GetProducts() {
    return this.http.get('https://localhost:7118/Product/GetAll');
  }
  GetProductbycode(code: any) {
    return this.http.get('https://localhost:7118/Product/GetByCode?Code='+code);
  }


 

  GetAllInvoice(data:any) : Observable<any> {
    this.loaderService.show();
  
    return this.http.post(this.url+'admin-control/get-appointment-details-by-date', data).pipe(
      tap(() => {
        // Hide loader when API call completes
        this.loaderService.hide();
      })
    );

    // return this.http.get('http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/');
    
    // return this.http.get('https://localhost:7118/Invoice/GetAllHeader');
  }


  GetMyAppointment(data:any) : Observable<any> {
    this.loaderService.show();
  
    return this.http.post(this.url+'patient/get-appointment-details-by-patient-id', data).pipe(
      tap(() => {
        // Hide loader when API call completes
        this.loaderService.hide();
      })
    );
  }

    // return this.http.get('http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/');
    
    // return this.http.get('https://localhost:7118/Invoice/GetAllHeader');
  




  GetInvHeaderbycode(invoiceno:any){
    return this.http.get('https://localhost:7118/Invoice/GetAllHeaderbyCode?invoiceno='+invoiceno);
  }
  GetInvDetailbycode(invoiceno:any){
    return this.http.get('https://localhost:7118/Invoice/GetAllDetailbyCode?invoiceno='+invoiceno);
  }
  RemoveInvoice(invoiceno:any){
    return this.http.delete('https://localhost:7118/Invoice/Remove?invoiceno='+invoiceno);
  }

  SaveInvoice(invoicedata:any){
    return this.http.post('https://localhost:7118/Invoice/Save',invoicedata);
  }

  GenerateInvoicePDF(invoiceno:any){
    return this.http.get('https://localhost:7118/Invoice/generatepdf?InvoiceNo='+invoiceno,{observe:'response',responseType:'blob'});
    
  }

  DoneAppointment(anyppointmentIds:any) : Observable<any> {
    this.loaderService.show();
    return this.http.post(this.url+'admin-control/appointment-completed',anyppointmentIds).pipe(
      tap(() => {
        // Hide loader when API call completes
        this.loaderService.hide();
      })
    );
  }

  CancelAppointment(anyppointmentIds:any) : Observable<any> {
    this.loaderService.show();
    return this.http.post(this.url+'admin-control/appointment-cancelled',anyppointmentIds).pipe(
      tap(() => {
        // Hide loader when API call completes
        this.loaderService.hide();
      })
    );
  }


}
