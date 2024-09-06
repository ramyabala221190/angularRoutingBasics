import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ToDosComponent } from './to-dos/to-dos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AlbumComponent } from './album/album.component';
import { PhotosComponent } from './photos/photos.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserDetailComponent,
    ToDosComponent,
    PostsComponent,
    CommentsComponent,
    PostDetailComponent,
    AlbumComponent,
    PhotosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
