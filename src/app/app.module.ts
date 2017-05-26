import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { CalendarComponent } from '../pages/calendar/calendar.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CalendarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
