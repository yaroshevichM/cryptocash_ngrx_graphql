import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/models/User';
import { UserUpdateRequestedAction } from 'src/app/store/actions/user.action';
import { IAppState } from 'src/app/store/appState';
import { selectUserInner } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public editProfileForm: FormGroup;
  public isEdit: boolean = false;
  public userData: IUser;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.initializationProfileForm();
    this.selectDataFromStore().subscribe((userData) => {
      this.userData = userData;
      if (userData) {
        this.editProfileForm.patchValue({
          email: userData.email,
          phonenumber: userData.phonenumber,
          accountType: userData.accountType,
        })
      }
    });
  }

  private initializationProfileForm() {
    this.editProfileForm = new FormGroup({
      accountType: new FormControl(''),
      phonenumber: new FormControl(''),
      email: new FormControl('')
    })
  }

  private selectDataFromStore() {
    return this._store.select(selectUserInner)
  }

  public toggleEditMode() {
    this.isEdit = !this.isEdit;
  }

  public updateUserData() {
    const updateUserData = this.editProfileForm.value
    updateUserData._id = this.userData._id
    this._store.dispatch(new UserUpdateRequestedAction(updateUserData))
  }

}
