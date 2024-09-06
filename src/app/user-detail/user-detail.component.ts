import { Component } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
   constructor(private activeRoute:ActivatedRoute,private usersService:UsersService,private router:Router){}

   userId:number=0;
   completed:string="yes";
   

   ngOnInit(){
    this.activeRoute.url.subscribe(
      ([urlSegments]:UrlSegment[])=>{
      const {path,parameters}=urlSegments;
      console.log("Logging the current router route");
      console.log("Path:",path);
      console.log("Params:",parameters)
    })
    console.log(this.activeRoute.snapshot.params) //this will execute only once when the component instantiates.
    this.activeRoute.params.subscribe((result:any)=>{
      console.log(result); //this will execute the first time and also every time the component activates.
      this.userId=result.userId;
    })
   }

   loadComments(){
    this.router.navigate([{ outlets: { comout: 'com' } }]);
  }

}
