import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getInterest(amout, months) {
    return this.http.get("https://ftl-frontend-test.herokuapp.com/interest?amount="+amout +"&numMonths=" +months);    
  }
}
