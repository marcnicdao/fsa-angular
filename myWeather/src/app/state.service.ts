import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Weather } from './cityWeathers';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor() {}
  private initialCities = ['Chicago', 'San Francisco', 'New York'];
  private cities: any = this.initialCities;
  private initialTempUnit = 'F';
  private tempUnit = new BehaviorSubject<string>(this.initialTempUnit);

  getTempUnit(): Observable<string> {
    return this.tempUnit.asObservable();
  }

  toggleTempUnit(tempUnit: string): void {
    this.tempUnit.next(tempUnit);
  }

  getCities() {
    return this.cities;
  }

  setCities(newCities: string[] | undefined) {
    this.cities = newCities;
  }
}
