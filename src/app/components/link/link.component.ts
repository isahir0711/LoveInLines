import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {
  @Input() linkText = '';
  @Input() linkRoute = '';
  @Input() linkIcon = '';
}
