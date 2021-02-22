import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';
import { IAppState } from 'src/app/store/appState';
import { IService } from '../../../../models/Service';
import { servicesRequestedAction } from '../../../../store/actions/services.action';
import { selectServicesInner } from '../../../../store/selectors/services.selector';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public servicesData: IService[];

  constructor(private _store: Store<IAppState>, private _router: Router, private _loaderService: LoaderService) { }

  ngOnInit() {
    this.dispatchActions()
  }

  public loadTerminal(service) {
    this._router.navigate([`/layout/terminal/${service._id}`])
  }

  private dispatchActions() {
    this._loaderService.isLoaderShow = true;
    this._store.dispatch(new servicesRequestedAction()); 
    this.selectDataFromStore().subscribe(servicesData => {
      this.servicesData = servicesData;
      this._loaderService.isLoaderShow = false;
    });
  }

  private selectDataFromStore() {
    return this._store.pipe(select(selectServicesInner))
  }
}
