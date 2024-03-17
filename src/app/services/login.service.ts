import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoaderService } from '.././loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	url = ' http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/'
   constructor(private http: HttpClient, private loaderService: LoaderService) {}

  login(data:any){
    this.loaderService.show();
    return this.http.post(this.url+'patient/check-registered-patient', data).pipe(
      tap(() => {
        // Hide loader when API call completes
        this.loaderService.hide();
      })
    );
  }

}


//http://localhost:8081/patient/check-registered-patient

/*{
    "phone_number": "9322086218"
}
*/

