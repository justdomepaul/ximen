import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullSpinnerService {
  show: boolean;
  constructor() { }
  showSpinner() {
    this.show = true;
  }
  closeSpinner() {
    this.show = false;
  }
  toggleSpinner() {
    this.show = !this.show;
  }
}
