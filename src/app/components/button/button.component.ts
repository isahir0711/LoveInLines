import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() buttonIcon: string = 'empty';
  
  @Input() buttonText: string = 'empty';

  @Input() backgroundColor: string = '';

  ngOnInit():void{
  }
  
}
