export interface cityWeather {
  name?: string;
  tempC: number;
  icon: string;
  forecast: string;
  tempHighC: number;
  tempLowC: number;
  date?: string;
}

export const cityWeathers: cityWeather[] = [
  {
    name: 'San Francisco',
    tempC: 20,
    icon: 'sunny',
    forecast: 'Sunny',
    tempHighC: 25,
    tempLowC: 17,
  },
  {
    name: 'New York',
    tempC: 20,
    icon: 'cloudy',
    forecast: 'Cloudy',
    tempHighC: 25,
    tempLowC: 17,
  },
  {
    name: 'Chicago',
    tempC: 20,
    icon: 'partly_cloudy',
    forecast: 'Partly Cloudy',
    tempHighC: 25,
    tempLowC: 17,
  },
];
