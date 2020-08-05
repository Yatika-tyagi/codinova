import { Component, OnInit } from '@angular/core';
import { posService } from './pos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Codinova';

  constructor(public posService: posService) {
  }

}
