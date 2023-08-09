import { Component } from '@angular/core';
import { cityWeathers, cityWeather } from '../cityWeathers';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css'],
})
export class WeatherListComponent {
  cityWeathers: cityWeather[] = cityWeathers;
}
