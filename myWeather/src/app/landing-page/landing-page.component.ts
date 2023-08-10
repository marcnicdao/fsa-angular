import { Component, OnInit, OnDestroy } from '@angular/core';
import { Weather } from '../cityWeathers';
import { HttpService } from '../http.service';
import { UtilService } from '../util.service';
import { Subscription } from 'rxjs';
import { StateService } from '../state.service';

@Component({
  selector: 'app-home',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  cities: Weather[];
  initCityNames: string[] = ['Chicago', 'San Francisco', 'New York'];
  subscription: Subscription;

  constructor(
    public httpService: HttpService,
    private utilService: UtilService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.cities = [];
    this.initCityNames;
    this.getInitCityWeather();
  }

  getInitCityWeather() {
    console.log('aaa', this.stateService.getCities());
    this.subscription = this.httpService
      .getInitialWeather(this.stateService.getCities())
      .subscribe((responses) => {
        responses.map((data, i) => {
          const citydata = this.utilService.formatCityWeatherObject(data);
          this.cities.push(citydata);
        });
      });
  }

  addCityWeather(cityName: string) {
    this.httpService.getWeather(cityName).subscribe({
      next: (response) => {
        const citydata = this.utilService.formatCityWeatherObject(response);
        this.cities.push(citydata);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        const newCities: any = this.cities.map((city) => city.name);
        this.stateService.setCities(newCities);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
