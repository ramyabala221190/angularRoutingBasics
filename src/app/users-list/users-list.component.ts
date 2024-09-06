import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  constructor(private usersService:UsersService,private activeRoute:ActivatedRoute){}

  users$:Observable<any>|undefined;

  ngOnInit(){
    this.activeRoute.url.subscribe(
      ([urlSegments]:UrlSegment[])=>{
      const {path,parameters}=urlSegments;
      console.log("Logging the current router route");
      console.log("Path:",path);
      console.log("Params:",parameters)
    })
    this.users$=this.usersService.fetchUsers();
  }

}
