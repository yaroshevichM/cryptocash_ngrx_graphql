import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoaderShow: boolean = false;

  constructor() { }
}
