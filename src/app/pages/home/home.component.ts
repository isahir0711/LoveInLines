import { Component, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastInfo } from '../../interfaces/toastInfo';
import { ToastService } from '../../services/toast.service';
import { ButtonComponent } from "../../components/button/button.component";
import { ToastComponent } from '../../components/toast/toast.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { inflate, deflate } from 'pako';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, ButtonComponent, ToastComponent, ReactiveFormsModule]
})
export class HomeComponent {
  private isPainting = false;
  private isErasing = false;
  startX = 0;
  startY = 0;
  colorCode: string = '#000';
  previousColor: string = this.colorCode;

  canvatools!: FormGroup;
  constructor(private formBuilder: FormBuilder, public toastService: ToastService, private route: ActivatedRoute, private router: Router) {
    this.createContactForm();
  }

  createContactForm() {
    this.canvatools = this.formBuilder.group({
      colorcode: '#000',
      width: 2
    });
  }

  ngOnInit(): void {
    this.colorCode = '#000';

    const colorpicker = document.getElementById('color') as HTMLInputElement;

    if (colorpicker == null) return;

    colorpicker.addEventListener('change', () => {
      this.colorCode = colorpicker.value;
    });
  }

  loadURLImg(imgURI: string) {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    if (canvas == null) return;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;

    var imagen = new Image();
    imagen.onload = function () {
      ctx.drawImage(imagen, 0, 0);
    };
    imagen.src = imgURI;
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      const canvasId = params['cId'];
      this.loadURLImg(canvasId);
    });

    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;
    if (canvas == null) return;
    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;

    canvas.width = 650;
    if (window.matchMedia('(max-width: 600px)').matches) {
      canvas.width = 325;
    }
    canvas.height = 500 - canvasOffsetY;

    // Set the background color
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('mousedown', (e) => {
      this.isPainting = true;
      this.startX = e.clientX
      this.startY = e.clientY;
      this.createCircle(this.startX, this.startY);

    });
    canvas.addEventListener('mouseup', (e) => {
      this.isPainting = false;
      ctx.stroke();
      ctx.beginPath();
      //TODO: Fix that when the uri is to big the browser throws a 431
      //this.updateURL();
    });

    canvas.addEventListener('mousemove', (event) => {
      const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx == null) return;
      if (canvas == null) return;
      if (!this.isPainting) return;

      const formData = this.canvatools.value;

      ctx.lineWidth = formData['width'];
      ctx.strokeStyle = this.colorCode;
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
      this.createCircle(this.startX, this.startY);

    });

    canvas.addEventListener('touchend', () => {
      this.isPainting = false;
      ctx.stroke();
      ctx.beginPath();
      //TODO: Fix that when the uri is to big the browser throws a 431
      //this.updateURL();
    });

    canvas.addEventListener('touchmove', (event) => {
      event.preventDefault();
      const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx == null) return;
      if (canvas == null) return;
      if (!this.isPainting) return;

      const formData = this.canvatools.value;
      ctx.lineWidth = formData['width'];
      ctx.strokeStyle = this.colorCode;
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

  createCircle(x: number, y: number) {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx == null) {
      return;
    }
    const formData = this.canvatools.value;
    const rect = canvas.getBoundingClientRect();
    const radius = formData['width'] / 10;
    ctx.fillStyle = this.colorCode;
    ctx.beginPath();
    ctx.arc(x - rect.left, y - rect.top, radius / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
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

  shareOnTwitter() {
  }

  updateURL() {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    if (canvas == null) return;
    let canvasData = canvas.toDataURL("image/png");
    canvasData = encodeURI(canvasData);

    this.router.navigate(['/Home', canvasData]);
  }

  clean() {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;
    if (canvas == null) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //cleaning the url
    this.router.navigate(['/Home', '%7C%7C']);
  }

  setEraser() {    
    this.isErasing = true;
    if (this.colorCode == '#ffffffff') {
      this.isErasing = false;
    }

    if (this.isErasing) {
      this.colorCode = '#ffffffff';
    }
    else {
      const colorpicker = document.getElementById('color') as HTMLInputElement;
      if (colorpicker == null) return;
      this.colorCode = colorpicker.value;
    }
  }
}

