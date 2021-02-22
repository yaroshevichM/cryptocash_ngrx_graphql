import { Injectable } from '@angular/core';
import { ApiService } from "../../core/services/api.service"
import { IUserRegistrationPayload } from '../../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _apiService: ApiService) {}

  loginUser(email: string, password: string) {
    return this._apiService.loginUser(email, password);
  }

  registerUser(userRegistrationData: IUserRegistrationPayload) {
    return this._apiService.registerUser(userRegistrationData)
  }

  isAuthenticated(): boolean {
    const currentUserId: string = window.sessionStorage.getItem('currentUserId');
    const currentUserToken: string = window.sessionStorage.getItem('currentUserToken');

    if(!(currentUserId && currentUserToken)) {
      return false
    }

    return true
  }
}
