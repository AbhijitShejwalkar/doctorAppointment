import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoaderService } from '.././loader/loader.service';
@Injectable({
  providedIn: 'root'
})
export class SlotbookingService {

  url = ' http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/'
  constructor(private http: HttpClient, private loaderService: LoaderService) { }


  slotBooking(data:any){
    this.loaderService.show();
    
    return this.http.post(this.url+'patient/available-time-slots', data).pipe(
      tap(() => {
        // Hide loader when API call completes
        this.loaderService.hide();
      })
    );
  }

  bookAppointment(data:any) {
    this.loaderService.show();
    return this.http.post(this.url+'patient/appointment-booking', data).pipe(
      tap(() => {
        // Hide loader when API call completes
        this.loaderService.hide();
      })
    );
  }
}
