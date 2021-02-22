import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { NotificationComponent } from 'src/app/modules/shared/components/notification/notification.component';
import { UserRegistrationRequestedAction } from 'src/app/store/actions/user.action';
import { IAppState } from 'src/app/store/appState';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  show: boolean = false;

  constructor(
    private _store: Store<IAppState>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  public togglePassword() {
    this.show = !this.show;
  }

  private initRegistrationForm() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phonenumber: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      submitpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      acceptPP: new FormControl('', Validators.required)
    });
  }

  public onRegister() {
    if (this.registrationForm.valid) {
      const registrationFormValue = this.registrationForm.getRawValue();
      delete registrationFormValue.acceptPP
      if (
        registrationFormValue.password.includes(
          registrationFormValue.submitpassword
        )
      ) {
        delete registrationFormValue.submitpassword;
        this._store.dispatch(
          new UserRegistrationRequestedAction(registrationFormValue)
        );
      } else {
        this._snackBar.openFromComponent(NotificationComponent, {
          duration: 3500,
          horizontalPosition: 'right',
          data: { text: "Passwords don't match!", type: 'error' },
        });
      }
    } else {
      this._snackBar.openFromComponent(NotificationComponent, {
        duration: 3500,
        horizontalPosition: 'right',
        data: { text: "Input data are invalid!", type: 'error' },
      });
    }
  }
}
