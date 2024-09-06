import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  fetchUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  fetchAlbumsOfUser(userId:number){
    return this.http.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
  }

  fetchPhotosInAlbum(albumId:number){
    return this.http.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  }

  fetchToDosOfUser(userId:number,completedStatus:boolean){
    return this.http.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}&completed=${completedStatus}`);
  }

  fetchPostsOfUser(userId:number){
    return this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }

  fetchPostDetail(postId:number){
    return this.http.get(`https://jsonplaceholder.typicode.com/posts?id=${postId}`);
  }

  fetchCommentsOfPost(postId:number){
    return this.http.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  }
}
