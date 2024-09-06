import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ToDosComponent } from './to-dos/to-dos.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AlbumComponent } from './album/album.component';
import { PhotosComponent } from './photos/photos.component';

//list of users
// each user has a list of todos
// each user has posts
// we can view the comments for each post

const routes: Routes = [
  {
    path:"users",
    component:UsersListComponent,
    children:[
      {
        path:":userId",
        component:UserDetailComponent,
        children:[
          {
            path:"todos", //ahow the list of todos
            component:ToDosComponent,
          },
          {
            path:"albums",
            component:AlbumComponent,
            children:[
              {
                path:":albumId",
                component:PhotosComponent
              }
            ]
          },
          {
            path:"posts",
            component:PostsComponent, //lists out the post titles
            children:[
              {
                path:":postId",
                component:PostDetailComponent ,//when I click on the post, show the post body
                children:[
                  {
                    path:"com",
                    component:CommentsComponent, //give an option to show the comments for the post
                    outlet:'comout'
                  }
                ]
              },
            ]
          }
        ]
      }
    ]

  },
  {path:"",pathMatch:"full",redirectTo:"users"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
