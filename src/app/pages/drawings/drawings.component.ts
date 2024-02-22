import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ApiService } from '../../services/api/api.service';
import { DrawingServerResponse } from '../../interfaces/image';
import { catchError, map } from 'rxjs';

@Component({
    selector: 'app-drawings',
    standalone: true,
    templateUrl: './drawings.component.html',
    styleUrl: './drawings.component.css',
    imports: [ButtonComponent]
})
export class DrawingsComponent {
    constructor(private apiService: ApiService) {
        this.getDrawings();
    }

    posts: DrawingServerResponse[] = [];
    loading: boolean = true;

    ngOnInit(): void {
    }

    getDrawings(){
        this.apiService.getImages().pipe(
            map(res => {
                this.posts = res;
                this.loading = false;              
            }),
            catchError(err=>{
                console.error(err);
                throw err;
            })
        ).subscribe();
    }
}
