import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {Title} from './services/title';
import {XLarge} from './directives/x-large';

import {IWeek} from '../model/IWeek';
import {IEvent} from '../model/IEvent';
import {ICalendar} from '../model/ICalendar';
import {Calendar} from '../model/Calendar';
import {ICalendarEvent} from '../model/ICalendarEvent';
import {OneBillionSeconds} from '../model/OneBillionSeconds';
import {Birthday} from '../model/Birthday';

import * as _ from 'lodash';
import moment = require("moment");

var multiplier = 0.5,
  marginTop = 800 * multiplier,
  marginBottom = 400 * multiplier,
  marginLeft = 200 * multiplier,
  photoMargin = 50 * multiplier,
  weekWidth = 540 * multiplier,
  weekHeight = 860 * multiplier;

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
        var ret = ((week.yearOfLife * 4) + week.weekOfMonth) * (weekHeight + photoMargin) + marginTop;
        return ret;
      },
      left: function(week) {
        return (week.monthOfYear) * (weekWidth + photoMargin) + marginLeft;
      }
    }
  };

  public dateFormat = 'yyyy-MM-dd';

  public currentDrawer = this.drawers.print;


  public calendarContainerHeight = ((numberOfWeeks / settings.monthsPerYear) * (weekHeight + photoMargin) + marginTop + marginBottom);
  public calendarContainerWidth = (settings.monthsPerYear * (weekWidth + photoMargin) + marginLeft * 2);

  // Set our default values
  data = { value: '' };
  // TypeScript public modifiers
  constructor(public title: Title) {

  }

  ngOnInit() {

    // this.title.getData().subscribe(data => this.data = data);

    //_.forEach([1, 2, 3, 4], function(value) {

    //});
  }

}


function addDays(date: Date, days:number) : Date {
    var newDate1 = new Date(date.getTime());
    var newDate = date.getDate() + days;
    newDate1.setDate(date.getDate() + days);
    return newDate1;
}
var numberOfWeeks = 5044;
var startDate = new Date(2015, 11, 30);
var endDay = moment(startDate).add(7 * numberOfWeeks, 'd');
var weeks = new Array<IWeek>();

var calendar: ICalendar;
calendar = new Calendar(startDate, numberOfWeeks);

var zoeBirthDay = new Date(2015, 11, 30);
var barbaraBirthDay = new Date(1986, 8, 7);

var calendarEvents = [
  new OneBillionSeconds(calendar),
  new Birthday(calendar, 'Zoe Anna', zoeBirthDay),
  new Birthday(calendar, 'Barbara', barbaraBirthDay)
];

var yearly : any[] = [
  {
    day: 30,
    month:12,
    cssClass: "own-birthday",
    text: function(i) { return i + 'Compleanno' }
  }
]

var settings = {
  monthsPerYear: 13,
  weeksPerMonth: 4
};

var weeksPerYear = settings.weeksPerMonth * settings.monthsPerYear;

var workers = {
    'function': function (func, week: IWeek) {

      func(week);
    },
    'object': function (obj){

    }
};

for (var i = 0; i < numberOfWeeks; i ++){
  var monthOfLife = Math.floor(i / settings.weeksPerMonth);

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
    cssClasses: '',
    events: Array<IEvent>()
  };

  _.forEach(calendarEvents,function(calendarEvent){
    if (calendarEvent.InWeek(curWeek)) {
      curWeek.cssClasses += calendarEvent.classes;
      curWeek.events.push(calendarEvent.event);
      //console.log(curWeek.cssClasses);
      //console.log('found event "' + calendarEvent.description + '" in week ' + curWeek.weekOfLife);
    }
    var minEventsLength = 6;
    if (curWeek.events.length < minEventsLength) {
      for (var i=0; i < minEventsLength - curWeek.events.length; i++){
        curWeek.events.push({
          description: '',
          date: null
        });
      }
    }
  });

  weeks.push(curWeek);

}
