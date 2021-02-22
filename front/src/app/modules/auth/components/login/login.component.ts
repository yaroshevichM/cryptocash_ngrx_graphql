import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { NotificationComponent } from 'src/app/modules/shared/components/notification/notification.component';
import { UserLoginRequestedAction } from 'src/app/store/actions/user.action';
import { IAppState } from 'src/app/store/appState';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  show: boolean = false;

  constructor(
    private _store: Store<IAppState>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  initLoginForm() {}

  togglePassword() {
    this.show = !this.show;
  }

  onLogin() {
    if (!this.loginForm.valid) {
      this._snackBar.openFromComponent(NotificationComponent, {
        duration: 3500,
        horizontalPosition: 'right',
        data: { text: "Input data are invalid!", type: 'error' },
      });
      return
    }
    const loginFormValue = this.loginForm.value;

    this._store.dispatch(new UserLoginRequestedAction({ ...loginFormValue }));
  }
}
