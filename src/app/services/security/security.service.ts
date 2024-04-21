import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../../DTOS/Callback';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }

  apiURL = environment.apiURL + 'api/Accounts';

  private readonly tokenkey = 'token';
  private readonly reftokenkey = 'reftoken';
  private readonly expirationkey = 'expiration';
  private readonly roleField = "role";

  isLogged(): boolean{
    const token = localStorage.getItem(this.tokenkey);

    if(!token){
      return false;
    }

    // const expiration = localStorage.getItem(this.expirationkey);

    // if(!expiration)
    // {
    //   return false;
    // }

    // const expirationdate = new Date(expiration);

    // if(expirationdate <= new Date()){
    //   this.logOut();
    //   return false;
    // }

    return true;

  }

  logOut(){
    localStorage.removeItem(this.tokenkey);
    localStorage.removeItem(this.reftokenkey);
    localStorage.removeItem(this.expirationkey);
    // localStorage.removeItem(this.expirationkey);
  }

  saveToken(authenticationResponse: AuthResponse){
    localStorage.setItem(this.tokenkey,authenticationResponse.token);
    localStorage.setItem(this.reftokenkey,authenticationResponse.refreshToken);
    localStorage.setItem(this.expirationkey,authenticationResponse.expiresAt.toString());
  }
}
