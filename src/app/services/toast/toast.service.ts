import { Injectable } from '@angular/core';
import { ToastInfo } from '../../interfaces/toastInfo';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: ToastInfo[] = []

  duration:number = 300;

  add(toastInfo: ToastInfo) {
    if(this.toasts.length < 1){
      this.toasts.push(toastInfo);
    }
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
  }
}
