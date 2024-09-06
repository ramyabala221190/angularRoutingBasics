import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
  constructor(private activatedRoute:ActivatedRoute,private userService:UsersService){}

  albumId:number=0;
  photos$:Observable<any>|undefined;

  ngOnInit(){
     this.activatedRoute.params.subscribe((result:any)=>{

        this.albumId=result.albumId;
        this.fetchPhotos();
     })
  }

  fetchPhotos(){
 this.photos$=this.userService.fetchPhotosInAlbum(this.albumId);
  }
}
