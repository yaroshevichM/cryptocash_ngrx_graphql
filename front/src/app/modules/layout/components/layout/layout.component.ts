import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/appState';
import { LoaderService } from '../../../shared/services/loader.service';
import { selectUserBalanceLoader } from '../../../../store/selectors/balance.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(public loaderService: LoaderService, private _router: Router, private _store: Store<IAppState>) { }
  
  ngOnInit(): void { }

  logOut() {
    window.sessionStorage.clear();
    this._router.navigate(['/login'])
  }
}
