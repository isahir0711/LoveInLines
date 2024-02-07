import { Component } from '@angular/core';
import { BoardComponent } from "../../components/board/board.component";
import { RealtimeboardComponent } from "../../components/realtimeboard/realtimeboard.component";

@Component({
    selector: 'app-room',
    standalone: true,
    templateUrl: './room.component.html',
    styleUrl: './room.component.css',
    imports: [BoardComponent, RealtimeboardComponent]
})
export class RoomComponent {

}
