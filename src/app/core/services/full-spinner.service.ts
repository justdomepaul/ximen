import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullSpinnerService {
  show: boolean;
  constructor() { }
  showSpinner() {
    console.log('open');
    this.show = true;
  }
  closeSpinner() {
    console.log('close');
    this.show = false;
  }
  toggleSpinner() {
    this.show = !this.show;
  }
}
