import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService{

  private perflist: any;

  private messagesource = new BehaviorSubject<string>("");

  currentMessage = this.messagesource.asObservable();
  
  constructor() {}


changeMessage(message: string){
  this.messagesource.next(message)
}

}
