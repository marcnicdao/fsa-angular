import { Component } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-weather-app-sample-app';
  isUsingF: boolean;

  constructor(private stateService: StateService) {
    this.isUsingF = true;
  }
  selectCelsius(): void {
    this.stateService.toggleTempUnit('C');
    this.isUsingF = false;
  }

  selectFahrenheit(): void {
    this.stateService.toggleTempUnit('F');
    this.isUsingF = true;
  }
}
