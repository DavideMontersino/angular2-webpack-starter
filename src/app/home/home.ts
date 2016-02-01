import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {Title} from './services/title';
import {XLarge} from './directives/x-large';

import * as _ from 'lodash';

var margin = 10,
  weekWidth = 200,
  weekHeight = 300;

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    ...FORM_DIRECTIVES,
    XLarge
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./home.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.html')
})
export class Home {


  public weeks = weeks;

  public drawers = {
    print: {
      top: function(week) {
      //console.log(' top');
        var ret = ((week.yearOfLife * 4) + week.weekOfMonth) * (weekHeight + margin);
        //console.log(week, ret);
        return ret;
      },
      left: function(week) {
        return (week.monthOfYear) * (weekWidth + margin);
      }
    }
  };

  public dateFormat = 'd-M-yyyy';

  public currentDrawer = this.drawers.print;

  // Set our default values
  data = { value: '' };
  // TypeScript public modifiers
  constructor(public title: Title) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);

    //_.forEach([1, 2, 3, 4], function(value) {
    //console.log(value);
    //});
  }

}

interface IWeek {
  weekOfLife : number;
  startDay : Date;
  endDay: Date;
  monthOfLife: number;
  yearOfLife: number;
  weekOfyear: number;
  weekOfMonth: number;
  monthOfYear: number;
  birthday: boolean;
  cssClasses: string;
}

class Week implements IWeek{
  public weekOfLife : number;
  public startDay : Date;
  public endDay: Date;
  public monthOfLife: number;
  public yearOfLife: number;
  public weekOfyear: number;
  public weekOfMonth: number;
  public monthOfYear: number;
  public birthday: boolean;
  public cssClasses: string;
}

function addDays(date: Date, days:number) : Date {
    var newDate1 = new Date(date.getTime());
    var newDate = date.getDate() + days;
    newDate1.setDate(date.getDate() + days);
    return newDate1;
}

var howManyWeeks = 5000;
var startDate = new Date('2015-12-30');
var weeks = new Array<IWeek>();

var importantDates = [];

var yearly : any[] = [
  {
    day: 30,
    month:12,
    cssClass: "own-birthday",
    text: function(i) { return i + 'Compleanno' }
  },
  function oneBillionSeconds (week: Week) {
     var obsDate = new Date(startDate.getDate());
     obsDate.setSeconds(obsDate.getSeconds() + 30);
     console.log(week.startDay, obsDate);
     var ret = week.startDay < obsDate && obsDate < week.endDay;
     if (ret) {
       console.log(obsDate);
     }
     return ret;
  }
]

var settings = {
  monthsPerYear: 13,
  weeksPerMonth: 4
};

var workers = {
    'function': function (func, week: IWeek) {
    
      func(week);
    },
    'object': function (obj){

    }
};

for (var i = 0; i < howManyWeeks; i ++){


  var weeksPerYear = settings.weeksPerMonth * settings.monthsPerYear,
    monthOfLife = Math.floor(i / settings.weeksPerMonth);

  var curWeek = {
    weekOfLife: i,
    startDay: addDays(startDate, i * 7),
    endDay: addDays(startDate, (i * 7) + 6),
    monthOfLife,
    yearOfLife: Math.floor(monthOfLife / settings.monthsPerYear),
    weekOfyear: i % weeksPerYear,
    weekOfMonth: i % settings.weeksPerMonth,
    monthOfYear: monthOfLife % settings.monthsPerYear,
    birthday: false,
    cssClasses: ''
  };

  _.forEach(yearly, function(rule) {
    workers[typeof rule](rule, curWeek);
  });

  var y = yearly[0];
  if (typeof y === 'object'){
    var birthDay = new Date(curWeek.startDay.getFullYear() + '-' + y.month + '-' + y.day);
  }

  function isInWeek(day, week){
    return curWeek.startDay <= birthDay &&
    birthDay <= curWeek.endDay;
  }

  if (isInWeek(birthDay,curWeek)){
    curWeek.birthday = true;
    curWeek.cssClasses += yearly[0].cssClass;
  }

  weeks.push(curWeek);
  //if (curWeek.weekOfLife === 261){
  //}
  if (curWeek.birthday){
  }

}
