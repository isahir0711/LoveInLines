import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError } from 'rxjs';
import { UploadImage } from '../../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.apiURL;

  generateCode(): Observable<any>{
    return this.http.get<any>(this.apiURL + '/generateCode');
  }

  uploadImage(image: UploadImage): Observable<any>{
    return this.http.post<any>(this.apiURL+'/uploadImage',image).pipe(
      catchError(err =>{
        throw err;
      })
    );
  }
}
