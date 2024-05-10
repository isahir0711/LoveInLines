import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LinkComponent } from "../link/link.component";
import { ApiService } from '../../services/api/api.service';
import { catchError, map } from 'rxjs';
import { ButtonComponent } from "../button/button.component";
import { AuthComponent } from "../auth/auth.component";
import { SecurityService } from '../../services/security/security.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [RouterLink, LinkComponent, ButtonComponent, AuthComponent]
})
export class NavbarComponent {

    constructor(private apiService: ApiService,private router:Router,private securityService:SecurityService) {
    }

    ngOnInit(): void {
        document.addEventListener("scroll", function () {
            const navbar = document.getElementById("main-links") as HTMLElement;

            if (window.scrollY > 70) {
                navbar.classList.add('solid');
            } else {
                navbar.classList.remove('solid');
            }
        });
    }

    createRoom(): void {
        this.apiService.generateCode().pipe(
            map(res => {
                this.router.navigate(
                    [`/Together/${res.code}`],
                  );
            }),
            catchError(err => {
                console.log(err);
                
                throw err
            })
        ).subscribe();
    }

    logOut(){
        this.securityService.logOut();
        this.router.navigate([''])

    }
}
