import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlotbookingService {

  url = ' http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/'
  constructor(private http: HttpClient) { }


  slotBooking(data:any){
    return this.http.post(this.url+'patient/available-time-slots', data);
  }

  bookAppointment(data:any) {
    return this.http.post(this.url+'patient/appointment-booking', data);
  }
}
