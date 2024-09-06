import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, UrlSegment } from '@angular/router';
import { EMPTY, expand, filter, from, map, of, reduce, scan, take, takeLast, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routingBasics';

  constructor(private router:Router,private activeRoute:ActivatedRoute){}

 
  ngOnInit(){

      this.router.events.pipe(
        filter((event)=>event instanceof NavigationEnd),
        map((event)=>this.activeRoute),
        expand((route:ActivatedRoute,index:number)=>{
           if(route.children.length){
           return route.children.map((route:ActivatedRoute)=>route);
           }
           else{
           return EMPTY;
           }
        }),
        reduce((acc:any[],route:ActivatedRoute)=>{
            const final=acc.concat(route.children.reduce((total:any[],curr)=>
            total.concat({path:curr.snapshot.url[0].path,parameters:curr.snapshot.params,queryParams:curr.snapshot.queryParams}),[]));
            console.log(final);
            return final;
          },[])
      ).subscribe(
        (result)=>{
        console.log(result)
      });
  }
}
