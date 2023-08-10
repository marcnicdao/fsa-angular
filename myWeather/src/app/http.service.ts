import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Weather, WeatherFromAPI } from './cityWeathers';
import { forkJoin, Observable } from 'rxjs';
import { FiveDayForecast } from './cityWeathers';

@Injectable()
export class HttpService {
  BASE_URL: string = `https://api.openweathermap.org/data/2.5/weather?q=`;
  FORECAST_URL: string = `https://api.openweathermap.org/data/2.5/forecast?q=`;
  weatherAppKey: string = `e57a8c9aba2b90e3e3df04fffe5d68d9`;

  constructor(private http: HttpClient) {}

  getInitialWeather(cityNames: any): Observable<WeatherFromAPI[]> {
    const responses: any[] = [];
    let urlstring = '';
    cityNames.map((cityName: any) => {
      urlstring = `${this.BASE_URL}${cityName}&appid=${this.weatherAppKey}`;
      responses.push(this.http.get(urlstring));
    });
    return forkJoin(responses);
  }
  getWeather(cityName: string) {
    const url = `${this.BASE_URL}${cityName}&appid=${this.weatherAppKey}`;

    return this.http.get<{ payload: Weather }>(url).pipe(
      map((res) => res),
      tap((data) => console.log('server data: ', data)),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    const errMsg: string = error.statusText;
    if (error.status) {
      alert('Could not locate city by that name, ' + errMsg);
    }
    return errMsg;
  }
  getForecast(cityName: string): Observable<FiveDayForecast> {
    const url = `${this.FORECAST_URL}${cityName}&appid=${this.weatherAppKey}`;

    return this.http.get<FiveDayForecast>(url);
  }
}
