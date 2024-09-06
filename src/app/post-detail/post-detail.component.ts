import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {
  
  constructor(private activatedRoute:ActivatedRoute,private usersService:UsersService){}

  postDetail$:Observable<any>|undefined;
  postId:number=0;

  ngOnInit(){
    this.activatedRoute.params.subscribe((result:any)=>{
       console.log(result);
      this.postId=result.postId;
      this.fetchPostDetail();
    })
  }

  fetchPostDetail(){
    this.postDetail$=this.usersService.fetchPostDetail(this.postId);
  }


}
