import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageFiltersService {

  constructor(private http: HttpClient) { }

  getImageData(data) {
    let url_params = new HttpParams({ fromObject: data })
    return this.http.get<any>("https://api.unsplash.com/photos/?", { params: url_params });
  }
  searchType(data) {
    let url_params = new HttpParams({ fromObject: data })
    return this.http.get<any>("https://api.unsplash.com/search/photos?", { params: url_params })
  }
}
