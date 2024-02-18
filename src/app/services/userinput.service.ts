import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserinputService {

  url = ' http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/'
  constructor(private http: HttpClient) {

  }

  userInput(data:any){
    return this.http.post(this.url+'patient/register-patient', data);
  }
}
