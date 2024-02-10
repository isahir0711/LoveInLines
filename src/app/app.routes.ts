import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';
import { DrawingsComponent } from './pages/drawings/drawings.component';

export const routes: Routes = [

    {path:'',component:HomeComponent,title:'I let you cook'},

    // {path:'Room/:roomId',component:RoomComponent,title:'Together!!'},
    {path:'Together/:room',component:RoomComponent,title:'Together!!'},
    {path:'Drawings',component:DrawingsComponent,title:'Drawings'},

    {path:'**', redirectTo:''}
];
