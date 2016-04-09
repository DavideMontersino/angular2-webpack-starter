import {ICalendarEvent} from './ICalendarEvent';
import {ICalendar} from './ICalendar';
import {IWeek} from './IWeek';
import moment = require("moment");

export class OneBillionSeconds implements ICalendarEvent {
	private calendar: ICalendar;
	private obsDate: any; //TODO find correct type

	constructor(calendar: ICalendar) {
		this.calendar = calendar;
		this.obsDate = moment(calendar.startDate)
			.add(1000000000, 's');

	}

	public get description () {
		return '1000.000.000 di secondi!';
	}
	public get classes() {
		return 'one-billion-seconds'
	}
	public InWeek (week: IWeek){

		var ret = this.obsDate.isSameOrBefore(week.endDay) && this.obsDate.isSameOrAfter(week.startDay);
		if (ret) {
			console.log('ahahah found, on week: ' + week.weekOfLife);
		}
		return ret;
	}
}
