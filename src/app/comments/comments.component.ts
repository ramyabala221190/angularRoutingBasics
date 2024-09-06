import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  constructor(private activatedRoute:ActivatedRoute,private usersService:UsersService){}

  postId:number=0;
  comments$:Observable<any>|undefined;

  ngOnInit(){
    this.activatedRoute.parent?.params.subscribe((result:any)=>{
       console.log(result);
       this.postId=result.postId;
      this.fetchComments();
    })
  }

  fetchComments(){
    this.comments$=this.usersService.fetchCommentsOfPost(this.postId)
  }

}
