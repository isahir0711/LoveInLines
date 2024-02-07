import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment.development';
import { RealTimeDrawingInfo } from '../../DTOS/realTime';

@Injectable({
  providedIn: 'root'
})
export class RealtimedrawingService {

  constructor() { }

  private apiURL = environment.socketServerURL;

  private socket$!: WebSocketSubject<any>;

  connectWebSocket(){
    this.socket$ = webSocket(this.apiURL);
    this.socket$.subscribe();
  }

  sendPoint(info: RealTimeDrawingInfo) {
    this.socket$.next(info);
  }

  endConnection() {
    this.socket$.complete();
  }
  
  fetchMessage(): Observable<RealTimeDrawingInfo> {
    return this.socket$.asObservable();
  }
}
