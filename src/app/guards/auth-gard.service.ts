import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ParametresService } from './../services/parametres.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {

  constructor(private paramService: ParametresService) { }

  canActivate() {
    var token = this.paramService.getToken();
    if (token) {
      console.log("there is a  token :",token);
      return true;
    } else {
      console.log("there is no token ",token);
      
      return false;
    }
  }
}
