import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ApiService } from '../../services/api/api.service';
import { DrawingServerResponse } from '../../interfaces/image';
import { catchError, map } from 'rxjs';
import { RouterModule } from '@angular/router';
import { SkeletonloaderComponent } from "../../components/skeletonloader/skeletonloader.component";

@Component({
    selector: 'app-drawings',
    standalone: true,
    templateUrl: './drawings.component.html',
    styleUrl: './drawings.component.css',
    imports: [ButtonComponent, RouterModule, SkeletonloaderComponent]
})
export class DrawingsComponent {
    constructor(private apiService: ApiService) {
    }
    
    posts: DrawingServerResponse[] = [];
    loading: boolean = true;
    
    ngOnInit(): void {
    }
    
    ngAfterViewInit(): void {
        this.getDrawings();
    }

    getDrawings(){
        this.apiService.getImages().pipe(
            map(res => {
                this.posts = res;
                setTimeout(() => {
                    this.loading = false;
                }, 300);           
            }),
            catchError(err=>{
                console.error(err);
                throw err;
            })
        ).subscribe();
    }

    getViewTransitionName(id:number){
        return `view-transition-name: post-${id};`;
    }
}
