import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { UpdatePostRequest } from '../models/update-post.model';
import { AddPostRequest } from '../models/add-post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  apiBaseUrl = environment.apiBaseUrl;

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiBaseUrl + '/api/posts');
  }

  getPostById(id :number): Observable<Post> {
    return this.http.get<Post>(this.apiBaseUrl  + '/api/posts/' + id);
  }

  updatePost(id :number | undefined, updatePostRequest : UpdatePostRequest): Observable<Post> {
    return this.http.put<Post>(this.apiBaseUrl  + '/api/posts/' + id, updatePostRequest);
  }

  addPost(addPostRequest : AddPostRequest): Observable<Post> {
    return this.http.post<Post>(this.apiBaseUrl  + '/api/posts' , addPostRequest);
  }

  deletePost(id :number | undefined): Observable<Post> {
    return this.http.delete<Post>(this.apiBaseUrl  + '/api/posts/' + id);
  }
}
