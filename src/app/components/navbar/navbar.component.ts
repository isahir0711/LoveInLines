import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from "../link/link.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [RouterLink, LinkComponent]
})
export class NavbarComponent {

    ngOnInit(): void {
        document.addEventListener("scroll", function () {
            const navbar = document.getElementById("navbar") as HTMLElement;

            if (window.scrollY > 70) {
                navbar.classList.add('solid');
            } else {
                navbar.classList.remove('solid');
            }
        });
    }
}
