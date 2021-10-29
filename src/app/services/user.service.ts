import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url = environment.url + "/user";
  constructor(private http: HttpClient) { }

  register(data) {
    return this.http.post(this.Url + '/register', data)
  }

  login(data) {
    return this.http.post(this.Url + '/login', data)
  }

  // for logcity
  // getNumberUsersByRole(data) {
  //   return this.http.post(this.Url + "/getNumberUsersByRole", data)
  // }
}