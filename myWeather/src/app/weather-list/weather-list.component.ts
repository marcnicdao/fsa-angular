import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css'],
})
export class WeatherListComponent implements OnInit {
  @Input() cityList: any[];
  @Output() cityNameSearch: EventEmitter<string> = new EventEmitter<string>();

  tempUnit: string;
  subscription: Subscription;
  form: FormGroup;

  constructor(private stateService: StateService, private fb: FormBuilder) {
    this.form = this.fb.group({
      cityName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$'),
        ],
      ],
    });
  }

  ngOnInit() {
    this.subscription = this.stateService.getTempUnit().subscribe({
      next: (res) => {
        this.tempUnit = res;
      },
      error: (err) => {
        console.error(`An error occurred: ${err.message}`);
      },
    });
  }

  addCity(cityName: string) {
    console.log('entered');
    this.cityNameSearch.emit(cityName);
  }
}
