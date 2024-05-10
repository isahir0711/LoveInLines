import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { ApiService } from '../../services/api/api.service';
import { catchError, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signinform',
    standalone: true,
    templateUrl: './signinform.component.html',
    styleUrl: './signinform.component.css',
    imports: [ButtonComponent]
})
export class SigninformComponent {
    constructor(private apiService: ApiService, private router: Router) {
    }

    url = "";

    signInGithub() {
        this.apiService.githubSignIn().pipe(
            map(res => {
                this.url = res;
                //window.location.href = this.url;
                console.log(this.url);
                
                
            }),
            catchError(err => {
                throw err;
            })
        ).subscribe();

    }

    signInGoogle() {
        this.apiService.googleSignIn().pipe(
            map(res => {
                this.url = res;
                console.log(this.url);
            }),
            catchError(err => {
                throw err;
            })
        ).subscribe();
    }

}
