import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';




@Component({
  selector: 'component-calendar',
  templateUrl: 'calendar.component.html',
})

export class CalendarComponent {
  @Output() userUpdated = new EventEmitter();
  public entry: any = {};
  public date: any = [];
  public choosedDate: any;   
  public month: any = "";
  public year: any = "";
  public first_day: any = "";
  public last_day: any = 0;
  public week: any = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public toastCtrl: ToastController,
  ) {


    var d = new Date();
    this.month = d.getMonth() + 1;
    this.year = d.getFullYear();
    this.first_day = d.getDay();


    this.mountCalendar(this.last_day, d)


  }

  /* Mount the days of calendar */
  mountCalendar(last_day, d) {
    this.date = [];

    while (last_day < d.getDate()) {
      var enable = true;
      var today = new Date();

      if (new Date(d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear()) < new Date(today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear())) {
        enable = false;
      }
      this.date.push(this.addDate(d, enable));
      last_day = d.getDate();
      d.setDate(d.getDate() + 1);
    }
  }

  /* Add parameters to object Date */
  addDate(date, enable) {
    return {
      week_day: date.getDay(),
      month_day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getUTCFullYear(),
      enable: enable
    }
  }

  /* Mount the day choosed */
  DayChoose(entry) {
    var today = new Date();

    if (new Date(entry.month + '/' + entry.month_day + '/' + entry.year) < new Date(today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear())) {
      this.choosedDate = "Data incorreta."
      this.InvalidDateToast();
    }
    else {
      if (entry.month.toString().length === 1) {
        entry.month = "0" + entry.month
      }
      if (entry.month_day.toString().length === 1) {
        entry.month_day = "0" + entry.month_day
      }

      this.choosedDate = entry.month_day + '/' + entry.month + '/' + entry.year;     
      this.ConfirmedToast();
    }
  }

  /*Show confirmed toast*/
  ConfirmedToast() {
    let toast = this.toastCtrl.create({
      message: 'Dia escolhido: ' + this.choosedDate,
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /*Show invalid toast*/
  InvalidDateToast() {
    let toast = this.toastCtrl.create({
      message: 'Não é possivel agendar dias passados.',
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /*Moves to the next month*/
  RightPress(nextMonth, year) {
    //console.log("Right" + nextMonth);
    nextMonth = nextMonth + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      year = year + 1;
    }
    var d = new Date(nextMonth + "/01/" + year);
    this.month = nextMonth;
    this.year = d.getFullYear();
    this.first_day = d.getDay();
    this.mountCalendar(this.last_day, d)
  }

  /*Moves to the previous month*/
  LeftPress(backMonth, year) {
    //console.log("Left" + backMonth);
    backMonth = backMonth - 1;
    if (backMonth === 0) {
      backMonth = 12;
      year = year - 1;
    }
    var d = new Date(backMonth + "/01/" + year);
    this.month = backMonth;
    this.year = d.getFullYear();
    this.first_day = d.getDay();
    this.mountCalendar(this.last_day, d)
  }




}