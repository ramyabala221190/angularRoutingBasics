import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  constructor(private activatedRoute:ActivatedRoute,private usersService:UsersService,private router:Router){}

  posts$:Observable<any>|undefined;
  userId:number=0;

  ngOnInit(){
    this.activatedRoute.parent?.params.subscribe((result:any)=>{
       console.log(result);
      this.userId=result.userId;
      this.fetchPosts();
    })
  }


  fetchPosts(){
    this.posts$=this.usersService.fetchPostsOfUser(this.userId)
  }

}
