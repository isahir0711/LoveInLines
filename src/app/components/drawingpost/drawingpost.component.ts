import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { DrawingServerResponse } from '../../interfaces/image';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-drawingpost',
  standalone: true,
  imports: [],
  templateUrl: './drawingpost.component.html',
  styleUrl: './drawingpost.component.css'
})
export class DrawingpostComponent {
  constructor(private apiService: ApiService, private route: ActivatedRoute) {
   }

  drawing = {} as DrawingServerResponse;
  
  postId: string = "";

  loading:boolean = true;

  vname = 'post' + this.postId;

  liked = false;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    const params = this.route.params.subscribe(params => {
      this.postId = params['postId'];
    });

    this.apiService.getPost(this.postId).pipe(
      map((response: DrawingServerResponse) => {
        this.drawing = response;
        this.loading = false;
      }),
      catchError(err => {
        throw err;
      })
    ).subscribe();
  }

  getViewTransitionName(id:number){
    return `view-transition-name: post-${id};`;
  }

  doubleClick(id:number){

    const likeHeart = document.getElementById('like-heart')!;

    if(this.liked){
      likeHeart.classList.add('disliked');
      setTimeout(() => {
        this.liked = false;
      }, 300);

    }
    else{
      this.liked = true;
    }

  }
}
