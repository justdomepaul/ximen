import { Component, OnInit } from '@angular/core';
import {FullSpinnerService} from '../../../../core/services/full-spinner.service';

@Component({
  selector: 'app-full-spinner',
  templateUrl: './full-spinner.component.html',
  styleUrls: ['./full-spinner.component.scss']
})
export class FullSpinnerComponent implements OnInit {
  constructor(public fullSpinnerService: FullSpinnerService) { }

  ngOnInit() {
  }
}
