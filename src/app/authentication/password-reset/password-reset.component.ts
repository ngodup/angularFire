import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  email: string | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onResetPassword() {
    if (this.email) {
      this.authService
        .resetPassword(this.email)
        .then(() => console.log('Login successfully'))
        .catch((err) => {
          if (err.code === 'auth/user-not-found') {
            alert('User email not register');
          } else {
            console.log('Login failed ', err);
          }
        });
        this.activeModal.dismiss();
    }


  }
}
