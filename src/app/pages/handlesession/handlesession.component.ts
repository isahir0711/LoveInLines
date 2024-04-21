import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { catchError, map } from 'rxjs';
import { Location } from '@angular/common';
import { SecurityService } from '../../services/security/security.service';

@Component({
  selector: 'app-handlesession',
  standalone: true,
  imports: [],
  templateUrl: './handlesession.component.html',
  styleUrl: './handlesession.component.css'
})
export class HandlesessionComponent {
  constructor(private router:Router,private securityService:SecurityService,private route: ActivatedRoute,private apiService:ApiService) {    
  }

  uri:string = "";

  ngOnInit(): void {
    // const fragment = window.location.hash; // Obtener el fragmento de la URL actual
    // const accessTokenParam = 'access_token=';

    // // Verificar si el fragmento contiene el parámetro 'access_token='
    // if (fragment.includes(accessTokenParam)) {
    //   const startIndex = fragment.indexOf(accessTokenParam) + accessTokenParam.length;
    //   console.log(fragment.substring(startIndex));
      
    // }
    this.uri = window.location.href;
    
    this.apiService.sendURI(this.uri).pipe(
      map(res=>{
        this.securityService.saveToken(res);
      }
    ),
    catchError(err=>{
      throw err;
    })
    ).subscribe();
    
  }
}
