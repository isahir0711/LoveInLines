import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError } from 'rxjs';
import { DrawingServerResponse, UploadImage } from '../../interfaces/image';
import { ConvertToBlob } from '../../Utilities/convertToBlob';
import { AuthResponse, CallbackRequest } from '../../DTOS/Callback';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL;

  generateCode(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/generateCode');
  }

  uploadImage(image: string): Observable<any> {

    const blob = ConvertToBlob(image);
    
    const formData = new FormData();
    formData.append('File', blob, 'image.png');

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post<any>(this.apiURL + '/uploadImage', formData,{headers}).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  getImages(): Observable<DrawingServerResponse[]> {
    return this.http.get<DrawingServerResponse[]>(this.apiURL + "/getDrawings");
  }

  githubSignIn():Observable<string>{
    return this.http.get<string>(this.apiURL + "/SignInGithub");
  }

  googleSignIn(): Observable<string> {
    return this.http.get<string>(this.apiURL + "/SignInGoogle");
  }

  getSession(): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<string>(this.apiURL + "/GetSession", { headers });
  }

  sendURI(uripet: string): Observable<AuthResponse> {
    const callbackRequest: CallbackRequest = {
      uri: uripet
    };
    return this.http.post<AuthResponse>(this.apiURL + "/CallBackURI", callbackRequest);
  }
}
