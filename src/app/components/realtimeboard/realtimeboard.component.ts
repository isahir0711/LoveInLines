import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Point } from '../../interfaces/strokes';
import { ToastInfo } from '../../interfaces/toastInfo';
import { ToastService } from '../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { ToastComponent } from '../toast/toast.component';
import { RealtimedrawingService } from '../../services/websocket/realtimedrawing.service';
import { RealTimeDrawingInfo } from '../../DTOS/realTime';
import { Observable, catchError, map, timeout } from 'rxjs';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-realtimeboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ToastComponent, ReactiveFormsModule,],
  templateUrl: './realtimeboard.component.html',
  styleUrl: './realtimeboard.component.css',
})
export class RealtimeboardComponent {
  private isPainting = false;
  private isErasing = false;
  startX = 0;
  startY = 0;
  colorCode: string = '#ff0000';
  lineWidth: number = 10;
  previousColor: string = this.colorCode;

  points: Point[] = [];
  strokes: Point[][] = [];

  constructor(public toastService: ToastService, private route: ActivatedRoute, private router: Router, private rtservice: RealtimedrawingService) {
  }

  ngOnInit(): void {

    const roomid = this.route.snapshot.paramMap.get('room')?.toString();
    if(roomid === undefined) {alert(roomid); return;}
    this.rtservice.connectWebSocket(roomid);

    this.colorCode = '#ff0000';

    const colorpicker = document.getElementById('color') as HTMLInputElement;
    if (colorpicker == null) return;
    const lineWidth = document.getElementById('width') as HTMLInputElement;
    if (lineWidth == null) return;

    colorpicker.addEventListener('change', () => {
      this.colorCode = colorpicker.value;
    });

    lineWidth.addEventListener('change', () => {
      this.lineWidth = Number(lineWidth.value);
    });
  }

  ngOnDestroy():void{
    this.rtservice.endConnection();
  }
  
  // webSocketInit(){
  //   this.rtservice.connectWebSocket();

  //   this.rtservice.fetchMessage().pipe(
  //     map(res =>{
  //       console.log(res);
  //       this.drawAPoint(res);
  //     }),
  //     catchError(error =>{
  //       console.error(error);
  //       throw error;
  //     })
  //   )
  // }

  //TODO: when trying to do the update everytime the canvas changes, end up with a 401 on the browser
  // loadURLImg(imgURI: string) {
  //   const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
  //   if (canvas == null) return;
  //   const ctx = canvas.getContext('2d');
  //   if (ctx == null) return;

  //   var imagen = new Image();
  //   imagen.onload = function () {
  //     ctx.drawImage(imagen, 0, 0);
  //   };
  //   imagen.src = imgURI;
  // }

  drawAPoint(Point:RealTimeDrawingInfo){
    const canvas = document.getElementById('drawing-canva' ) as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx == null) return;
      if (canvas == null) return;      
      ctx.lineWidth = Point.LineWidth;
      ctx.strokeStyle = Point.ColorCode;
      ctx.lineCap = 'round';

      const rect = canvas.getBoundingClientRect();
      const point = {
        x: Point.XPosition,
        y: Point.YPosition,
      };
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      ctx.beginPath();
  }

  ngAfterViewInit() {

    //TODO: when trying to do the update everytime the canvas changes, end up with a 401 on the browser
    // this.route.params.subscribe((params) => {
    //   const canvasId = params['cId'];
    //   this.loadURLImg(canvasId);
    // });

    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx == null) return;
    if (canvas == null) return;
    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;

    
    
    this.rtservice.fetchMessage().pipe(
      map(res =>{
        this.drawAPoint(res);
      }),
      catchError(err =>{
        throw err
      })
    ).subscribe();

    canvas.width = 650;
    if (window.matchMedia('(max-width: 650px)').matches) {
      canvas.width = 325;
    }
    canvas.height = 500 - canvasOffsetY;

    // Set the background color
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('mousedown', (e) => {
      this.isPainting = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.points = [];
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
      const canvas = document.getElementById('drawing-canva' ) as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx == null) return;
      if (canvas == null) return;
      if (!this.isPainting) return;

      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.colorCode;
      ctx.lineCap = 'round';

      const rect = canvas.getBoundingClientRect();
      const point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      ctx.lineTo(point.x, point.y);

      const Pointinfo: RealTimeDrawingInfo = {
        LineWidth: this.lineWidth,
        ColorCode:this.colorCode,
        XPosition:point.x,
        YPosition:point.y
      }
      ctx.stroke();

      this.rtservice.sendPoint(Pointinfo);
      //provisional solution
      /**setTimeout(()=>{
      },3000) */

      this.points.push({
        lineWidht: this.lineWidth,
        colorCode: this.colorCode,
        xPosition: point.x,
        yPosition: point.y,
      });
    });

    canvas.addEventListener('touchstart', (e) => {
      this.isPainting = true;
      const touch = e.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
      this.points = [];
      this.createCircle(this.startX, this.startY);
    });

    canvas.addEventListener('touchend', () => {
      this.isPainting = false;
      ctx.stroke();
      ctx.beginPath();
      this.strokes.push(this.points);
      //TODO: Fix that when the uri is to big the browser throws a 431
      //this.updateURL();
    });

    canvas.addEventListener('touchmove', (event) => {
      event.preventDefault();
      const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx == null) return;
      if (canvas == null) return;
      if (!this.isPainting) return;

      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.colorCode;
      ctx.lineCap = 'round';

      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      const point = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };

      ctx.lineTo(point.x, point.y);

      const Pointinfo: RealTimeDrawingInfo = {
        LineWidth: this.lineWidth,
        ColorCode:this.colorCode,
        XPosition:point.x,
        YPosition:point.y
      }
      ctx.stroke();

      this.rtservice.sendPoint(Pointinfo);
      
      this.points.push({
        lineWidht: this.lineWidth,
        colorCode: this.colorCode,
        xPosition: point.x,
        yPosition: point.y,
      });
      ctx.stroke();
    });
  }

  
  //TODO: Fix the undo function, it only fails when we draw points clicking, if all of the content are lines it does work correctly
  /*
  undo(){
    //clean the canvas
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;
    if (canvas == null) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.strokes.splice(-1,1)
    this.drawStrokes();
  }
  */
  drawStrokes() {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx == null) return;
    if (canvas == null) return;
    const rect = canvas.getBoundingClientRect();
    this.strokes.forEach((path) => {
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.moveTo(path[0].xPosition, path[0].yPosition);
      for (let i = 1; i < path.length; i++) {
        ctx.lineWidth = path[i].lineWidht;
        ctx.strokeStyle = path[i].colorCode;
        ctx.lineTo(path[i].xPosition, path[i].yPosition);
      }
      ctx.stroke();
    });
    ctx.stroke();
    ctx.beginPath();
  }

  createCircle(x: number, y: number) {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    /*old way of creating circles*/
    /*
    ctx.beginPath();
    ctx.arc(x - rect.left, y - rect.top, radius / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    */

    //TODO: try to understand why the undo doesn't work well here
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.colorCode;
    ctx.lineCap = 'round';
    this.points = [];

    const rect = canvas.getBoundingClientRect();
    const point = {
      x: x - rect.left,
      y: y - rect.top,
    };

    ctx.lineTo(point.x, point.y);
    this.points.push({
      lineWidht: this.lineWidth,
      colorCode: this.colorCode,
      xPosition: point.x,
      yPosition: point.y,
    });
    ctx.stroke();
  }

  shareOnFacebook() {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    if (canvas == null) return;
    let canvasData = canvas.toDataURL('image/png');

  }

  saveImg(): void {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    if (canvas == null) return;

    const link = document.createElement('a');
    link.download = 'masthepeace.png';
    link.href = canvas.toDataURL();
    link.click();

    const toastInfo: ToastInfo = {
      title: 'Image saved!',
      type: '',
    };
    this.toastService.add(toastInfo);
  }

  shareOnTwitter() {
  }

  updateURL() {
    const canvas = document.getElementById(
      'drawing-canva'
    ) as HTMLCanvasElement;
    if (canvas == null) return;
    let canvasData = canvas.toDataURL('image/png');
    canvasData = encodeURI(canvasData);

    //this.router.navigate(['/Home', canvasData]);
  }

  clean() {
    const canvas = document.getElementById('drawing-canva') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx == null) return;
    if (canvas == null) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.strokes = [];
    //cleaning the url
    //this.router.navigate(['/Home', '%7C%7C']);
  }

  setEraser() {
    this.isErasing = true;
    if (this.colorCode == '#ffffffff') {
      this.isErasing = false;
    }

    if (this.isErasing) {
      this.colorCode = '#ffffffff';
    } else {
      const colorpicker = document.getElementById('color') as HTMLInputElement;
      if (colorpicker == null) return;
      this.colorCode = colorpicker.value;
    }
  }
}
