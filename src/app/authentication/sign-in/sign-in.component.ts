import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service'
import { PasswordResetComponent } from '../password-reset/password-reset.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: NgbModal,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: [null, [Validators.required]]
    })
  }

  onLogin(form: NgForm) {

  }

  onGoogleLogin() {
    this.authService.googleAuthentication().then((response) => {
      console.log('data : ' + response)
    })
    .catch(err => {
      console.log('Error via Google OAuth ' + err);
      debugger
    })
  }

  passwordReset() {
    const modalRef = this.modalCtrl.open(PasswordResetComponent);
  }
 
}
