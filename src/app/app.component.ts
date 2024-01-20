import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "./components/button/button.component";
import { ToastComponent } from "./components/toast/toast.component";
import { ToastInfo } from './interfaces/toastInfo';
import { ToastService } from './services/toast.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanvaTools } from './interfaces/tools';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, ButtonComponent, ToastComponent, ReactiveFormsModule]
})
export class AppComponent {
  private isPainting = false;
  startX = 0;
  startY = 0;

  canvatools!: FormGroup;
  constructor(private formBuilder: FormBuilder, public toastService: ToastService, private renderer: Renderer2) {

    this.createContactForm();
  }

  createContactForm() {
    this.canvatools = this.formBuilder.group({
      colorcode: '#00000',
      width: 2
    });
  }

  ngOnInit(): void {


  }

  ngAfterViewInit() {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx == null) {
      return;
    }
    if (canvas == null) {
      return;
    }
    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;

    canvas.width = window.innerWidth - canvasOffsetX;

    canvas.height = 500 - canvasOffsetY;

    // Set the background color
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // //draw something
    // ctx.fillStyle = "#000000";
    // ctx.fillRect(0, 0, 150, 75);

    canvas.addEventListener('mousedown', (e) => {
      this.isPainting = true;
      this.startX = e.clientX
      this.startY = e.clientY;
    });
    canvas.addEventListener('mouseup', (e) => {
      this.isPainting = false;
      ctx.stroke();
      ctx.beginPath();
    });

    canvas.addEventListener('mousemove', (event) => {
      const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx == null) {
        return;
      }
      if (canvas == null) {
        return;
      }
      if (!this.isPainting) {
        return;
      }

      if (ctx == null) return;

      const formData = this.canvatools.value;

      ctx.lineWidth = formData['width'];
      ctx.strokeStyle = formData['colorcode']
      ctx.lineCap = 'round';

      const rect = canvas.getBoundingClientRect();
      const point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };


      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    });

    canvas.addEventListener('touchstart', (e) => {
      this.isPainting = true;
      const touch = e.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    });
    
    canvas.addEventListener('touchend', () => {
      this.isPainting = false;
      ctx.stroke();
      ctx.beginPath();
    });
    
    canvas.addEventListener('touchmove', (event) => {
      event.preventDefault();
      const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx == null) {
        return;
      }
      if (canvas == null) {
        return;
      }
      if (!this.isPainting) {
        return;
      }
    
      if (ctx == null) return;
    
      const formData = this.canvatools.value;
    
      ctx.lineWidth = formData['width'];
      ctx.strokeStyle = formData['colorcode']
      ctx.lineCap = 'round';
    
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      const point = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    });
  }

  saveImg(): void {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    if (canvas == null) return;

    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();

    const toastInfo: ToastInfo = {
      title: 'Image saved!',
      type: ''
    }
    this.toastService.add(toastInfo);
  }

  clean() {

    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx == null) {
      return;
    }
    if (canvas == null) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

