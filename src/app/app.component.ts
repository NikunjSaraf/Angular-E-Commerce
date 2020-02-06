import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  constructor(private userServices:UserService, private auth:AuthService,private route:Router){

    this.auth.user$.subscribe(user => {

      if(!user) return;
      
      this.userServices.save(user);

      let returnUrl=localStorage.getItem('returnUrl');
      if(!returnUrl) return;
      
      localStorage.removeItem(returnUrl);
      this.route.navigateByUrl(returnUrl);  
    });
  }
}
