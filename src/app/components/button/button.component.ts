import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() buttonIcon: string = 'empty';

  @Input() buttonText: string = 'empty';

  @Input() backgroundColor: string = '';

  @Input() hrefURL: string = '';

  @Input() isToggle: boolean = false;

  @Input() cursorType: string = 'pointer';

  toggle = false;
  ngOnInit(): void {
  }

  toggleButton() {
    if (this.toggle) {
      this.toggle = false;
    }
    else{
      this.toggle = true;      
    }
  }
}
