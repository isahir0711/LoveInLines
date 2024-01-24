import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:'Home/:cId',component:HomeComponent,title:'Drawing!'},

    {path:'',redirectTo:'/Home/1',pathMatch:'full'},
    {path:'**', redirectTo:'/Home/1'}
];
