import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-handlesession',
  standalone: true,
  imports: [],
  templateUrl: './handlesession.component.html',
  styleUrl: './handlesession.component.css'
})
export class HandlesessionComponent {
  constructor(private router:Router,private route: ActivatedRoute,private apiService:ApiService) {    
  }

  ngAfterViewInit(): void {
    const fragment = window.location.hash;
    localStorage.setItem("token", fragment);
    
    this.apiService.sendToken(fragment).pipe(
      catchError(err=>{
        throw err;
      })
    ).subscribe();
  }
}
