import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "./components/button/button.component";
import { ToastComponent } from "./components/toast/toast.component";
import { ToastInfo } from './interfaces/toastInfo';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, ButtonComponent, ToastComponent]
})
export class AppComponent {
  constructor(public toastService: ToastService) {

  }

  ngOnInit(): void {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    if (canvas != null) {
    }
    const strokeColor = document.getElementById('color') as HTMLInputElement

    if (strokeColor != null) {
      console.log(strokeColor.value)
    }

  }

  saveImg(): void {
    const toastInfo: ToastInfo = {
      title: 'Image saved!',
      type: ''
    }
    this.toastService.add(toastInfo);
  }

}

