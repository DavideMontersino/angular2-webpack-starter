import {ICalendarEvent} from './ICalendarEvent';
import {ICalendar} from './ICalendar';
import {IWeek} from './IWeek';
import moment = require("moment");

export class Birthday implements ICalendarEvent {
	private calendar: ICalendar;

	constructor(
		calendar: ICalendar,
		public name: string,
		public birthday: Date
		) {
		this.calendar = calendar;
		console.log('Birthday is on ' + birthday);
	}

	public get description() {
		return 'Compleanno di ' + this.name;
	}

	public get classes() {
		return 'own-birthday';
	}

	public InWeek(week: IWeek) {

		var birthDay = new Date(
			week.startDay.getFullYear(),
			this.birthday.getMonth(),
			this.birthday.getDate()
		);

		//console.log(birthDay, week);

		var inWeek = week.startDay <= birthDay &&
			birthDay <= week.endDay;
		return inWeek;
	}
}
