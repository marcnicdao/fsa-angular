import { Component, OnInit, OnDestroy } from '@angular/core';
import { Weather } from '../cityWeathers';
import { HttpService } from '../http.service';
import { UtilService } from '../util.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  cities: Weather[];
  initCityNames: string[];
  subscription: Subscription;

  constructor(
    public httpService: HttpService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.cities = [];
    this.initCityNames = ['Chicago', 'San Francisco', 'New York'];
    this.getInitCityWeather();
  }

  getInitCityWeather() {
    this.subscription = this.httpService
      .getInitialWeather(this.initCityNames)
      .subscribe((responses) => {
        responses.map((data, i) => {
          const citydata = this.utilService.formatCityWeatherObject(data);
          this.cities.push(citydata);
        });
      });
  }

  addCityWeather(cityName: string) {
    console.log(cityName);
    this.httpService.getWeather(cityName).subscribe((response) => {
      console.log(response);
      const citydata = this.utilService.formatCityWeatherObject(response);
      this.cities.push(citydata);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
