import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string = "http://localhost:8081/addressbookservice/";

  constructor(private httpClient: HttpClient) { }

  getAddressBookData(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "getAll");
  }

  addNewContact(body: any): Observable<any> {
    console.log(body);
    
    return this.httpClient.post(this.baseUrl + "insert", body);
  }

  deleteContact(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "delete/" + id);
  }

  updateContact(id: number, body: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "update/" + id, body);
  }

}