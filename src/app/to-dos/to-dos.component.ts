import { Component, Input, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss']
})
export class ToDosComponent {

  @Input('todosList')todosList:any[]=[];
  userId:number=0;
  todos$:Observable<any>|undefined;

  constructor(private activeRoute:ActivatedRoute,private usersService:UsersService) {

    combineLatest([ this.activeRoute.parent?.params, this.activeRoute.queryParams]).subscribe(([result]:any[])=>{
      console.log(result);
      this.userId=result.userId;
      this.fetchToDos();
    })

    // this.activeRoute.parent?.params.subscribe((result:any)=>{
    //   console.log(this.activeRoute.snapshot.queryParams)
    //   console.log(result); //this will execute the first time and also every time the component activates.
    //   this.userId=result.userId;
    //   this.fetchToDos();
    // }) 

  }

  fetchToDos(){
    this.todos$=this.usersService.fetchToDosOfUser(this.userId,
      this.activeRoute.snapshot.queryParams["completed"]);
  }


  ngOnChanges(changes:SimpleChange){
    console.log(changes)
  }


}
