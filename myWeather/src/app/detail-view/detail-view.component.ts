import { Component, OnInit } from '@angular/core';
import { DetailWeather, Weather } from '../cityWeathers';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { UtilService } from '../util.service';
import { Subscription } from 'rxjs';
import { StateService } from '../state.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent implements OnInit {
  detailWeather: DetailWeather;
  subscription: Subscription;
  tempUnit: string;
  weather: Weather;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private utilService: UtilService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.detailWeather = {
      name: '',
      fiveDayForecast: [],
    };
    this.route.params.subscribe((params) => {
      this.getCityForecast(params['cityName']);
      this.getCityWeather(params['cityName']);
    });

    this.subscription = this.stateService.getTempUnit().subscribe({
      next: (res) => {
        this.tempUnit = res;
      },
      error: (err) => {
        console.error(
          `An error occurred when getting temperature unit: ${err.message}`
        );
      },
    });
  }

  getCityForecast(cityName: string) {
    this.httpService.getForecast(cityName).subscribe({
      next: (data: any) => {
        this.detailWeather = {
          name: data.city.name,
          fiveDayForecast: this.utilService.formatForcastObject(data.list),
        };
        console.log(this.detailWeather);
      },
      error: (error: any) => {},
    });
  }

  getCityWeather(cityName: string) {
    this.httpService.getWeather(cityName).subscribe({
      next: (data: any) => {
        this.weather = this.utilService.formatCityWeatherObject(data);
        console.log('weather', this.weather, this.weather.name);
      },
      error: (error: any) => {
        console.error(
          `An error occurred when retrieving weather data: ${error.message}`
        );
      },
    });
  }
}
