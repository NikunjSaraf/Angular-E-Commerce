import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {  map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {


  constructor(private auth:AuthService,private userService:UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
   .pipe(switchMap(user=> {
       return this.userService.get(user.uid).valueChanges()
       }),
       map(appUser=> appUser.isAdmin));
 }

 
}
