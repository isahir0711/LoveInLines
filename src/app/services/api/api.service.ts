import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.apiURL;

  generateCode(): Observable<any>{
    return this.http.get<any>(this.apiURL + '/generateCode');
  }
}
