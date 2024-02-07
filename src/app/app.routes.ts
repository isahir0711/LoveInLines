import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';

export const routes: Routes = [

    {path:'',component:HomeComponent},

    {path:'Room',component:RoomComponent},

    {path:'**', redirectTo:''}
];
