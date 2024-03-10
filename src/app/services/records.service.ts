// record.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  url = 'http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/'


  // http://ec2-54-198-60-162.compute-1.amazonaws.com:8081/admin-control/get-appointment-details-by-date
  private records: any[] = []; // Define your data array here or fetch it from an API

  constructor(private http: HttpClient) {}

  getRecords(data:any) {
    // this.records = this.http.get('https://dummyjson.com/users');
    //  "https://dummyjson.com/users";
    // Implement logic to fetch records from API or return in-memory data
    return this.http.post(this.url+'admin-control/get-appointment-details-by-date', data);
    // return this.records;
  }

  deleteRecords(selectedIds: string[]): void {
    // Implement deletion logic here
    this.records = this.records.filter(record => !selectedIds.includes(record.id));
  }
}
