import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

	url = ' http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/'
   constructor(private http: HttpClient) {}

  login(data:any){
    return this.http.post(this.url+'patient/check-registered-patient', data);
  }
}


//http://localhost:8081/patient/check-registered-patient

/*{
    "phone_number": "9322086218"
}
*/

