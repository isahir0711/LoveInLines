import { Component } from '@angular/core';
import { SigninformComponent } from "../../components/signinform/signinform.component";

@Component({
    selector: 'app-sign-in',
    standalone: true,
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css',
    imports: [SigninformComponent]
})
export class SignInComponent {

}
