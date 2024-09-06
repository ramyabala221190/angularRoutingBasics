import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
    constructor(private activatedRoute:ActivatedRoute,private userService:UsersService){}

    userId:number=0;
    albums$:Observable<any>|undefined;

    ngOnInit(){
       this.activatedRoute.parent?.params.subscribe((result:any)=>{

          this.userId=result.userId;
          this.fetchAlbums();
       })
    }

    fetchAlbums(){
   this.albums$=this.userService.fetchAlbumsOfUser(this.userId);
    }
}
