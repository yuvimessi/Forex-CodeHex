import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from './data-service.service';


@Injectable({
  providedIn: 'root'
})



export class UserGuardGuard implements CanActivate {
  message: any;
  data: DataServiceService;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    this.data.currentMessage.subscribe(message => this.message = message);
    if (this.message != null)
      return true;

    return false;
  }

}
