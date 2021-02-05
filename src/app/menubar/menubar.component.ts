import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { DataServiceService } from '../data-service.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenubarComponent implements OnInit {

  loggedIn = false;
  signInErrorMessage = "";
  signUpErrorMessage = "";
  public isMenuCollapsed = true;



  message: string;
  RouterModule: any;

  ngOnInit() {
    //console.log(this.loggedIn);
    this.data.currentMessage.subscribe(message => this.message = message)
    //console.log(this.message);

  }


  constructor(private modalService: NgbModal, public afAuth: AngularFireAuth, private data: DataServiceService, private router: Router) { }

  // opens login modal
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-login' });
  }

  //open register modal
  show(content1: any) {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-register' });
  }

  //to dismiss all modals
  dismissAll() {
    this.modalService.dismissAll();
  }

  //google sign in firebase auth
  googleSignInViaPopup() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    //.then((userCredentials) => console.log(userCredentials));
  }

  //email/password sign up firebase auth
  signUp(value: { passwd: string; rpasswd: string; email: string; }, content2) {

    if (value.passwd.localeCompare(value.rpasswd) == 0) {

      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.passwd)
        //.then((userCredentials) => console.log(userCredentials))
        .then(() => this.modalService.open(content2, { ariaLabelledBy: 'modal-reginfo' }))
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
            case "auth/wrong-password":
            case "auth/user-not-found":
              {
                this.signUpErrorMessage = "Unexpected Error";
                break;
              }
            default:
              {
                this.signUpErrorMessage = "An account may already exist with this email address. Please Sign in.";
                break;
              }
          }
        });
    }
  }

  //email/password sign in firebase auth
  signIn(value: { email: string; passwd: string; }) {
    this.afAuth.auth.signInWithEmailAndPassword(value.email, value.passwd)
      //.then((userCredentials) => console.log(userCredentials))
      .then(() => this.loggedIn = true)
      .then(() => this.data.changeMessage(this.message = value.email))
      .then(() => this.dismissAll())
      .then(() => this.router.navigateByUrl('/user-dashboard'))
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/wrong-password":
          case "auth/user-not-found":
            {
              this.signInErrorMessage = "Wrong email address or password.";
              break;
            }
          default:
            {
              this.signInErrorMessage = "Unexpected Error";
              break;
            }
        }
      });
  }


  // logs out user
  logOut() {
    this.afAuth.auth.signOut();
    this.loggedIn = false;
    this.router.navigateByUrl('/home');
  }

}



