import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { VilleQuartierService } from 'src/app/services/ville-quartier.service';

@Component({
  selector: 'app-logcity',
  templateUrl: './logcity.page.html',
  styleUrls: ['./logcity.page.scss'],
})
export class LogcityPage implements OnInit {

  data: any = []
  // countC: number = 0;
  // countV: number = 0;

  constructor(private V_Q_service: VilleQuartierService, private userService: UserService) {
    this.V_Q_service.getVilles().subscribe(res => {
      console.log("ttttt", res);
      this.data = res;
    })

    // this.userService.getNumberUsersByRole(this.data.name).subscribe(res => {
    //   console.log("aaaaa", res);
    //   this.countC
    // })
  }

  ngOnInit() {
  }

}
