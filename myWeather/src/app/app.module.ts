import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { RouterModule } from '@angular/router';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WeatherListComponent,
    LandingPageComponent,
    DetailViewComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: LandingPageComponent },
      { path: 'details/:cityName', component: DetailViewComponent },
    ]),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
