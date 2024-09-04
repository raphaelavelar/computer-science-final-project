import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Post } from '../../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = "";

  constructor(private _httpClient: HttpClient) {
      this.url = `${environment.apiUrl}/api/posts/`;
  }

  public create(post: Post) {
      return this._httpClient.post<void>(this.url, post);
  }

  public list() {
      return this._httpClient.get<Post[]>(this.url);
  }
}
