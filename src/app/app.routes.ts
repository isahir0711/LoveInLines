import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';
import { DrawingsComponent } from './pages/drawings/drawings.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HandlesessionComponent } from './pages/handlesession/handlesession.component';
import { DrawingpostComponent } from './components/drawingpost/drawingpost.component';

export const routes: Routes = [

    {path:'Draw',component:HomeComponent,title:'I let you cook'},

    // {path:'Room/:roomId',component:RoomComponent,title:'Together!!'},
    {path:'Together/:room',component:RoomComponent,title:'Together!!'},
    {path:'Drawings',component:DrawingsComponent,title:'Drawings'},
    {path:'SignIn',component:SignInComponent,title:'Sign In'},
    {path:'HandleSession',component:HandlesessionComponent,title:'HandleSession'},
    {path:'Drawing/:postId',component:DrawingpostComponent,title:'Post'},

    
    { path: '**', redirectTo: 'Draw'}

];
