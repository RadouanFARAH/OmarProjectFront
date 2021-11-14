import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  url = environment.url
  constructor(private http: HttpClient, private storage: Storage) {
  }

  async getVendeurByReponsableByDay() {
    console.log("triggred");

    return new Promise((resolve, reject) => {
      this.storage.get('tokenR').then((token) => {
        console.log("triggred");

        if (token) {
          console.log("triggred");

          this.storage.set('token', token).then(() => {
            console.log("triggred");

            resolve(this.http.get(this.url + '/responsable/getVendeurByReponsableByDay'))
          })
        }
      })
    })
  }
}
