import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SecurityService } from '../../services/security/security.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private securityService:SecurityService) {
  }

  ngOnInit(): void {
  }

  isAuthorized(): boolean {
    return this.securityService.isLogged();
  }
}
