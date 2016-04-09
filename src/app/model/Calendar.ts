import {ICalendar} from './ICalendar';
import {IWeek} from './IWeek';

export class Calendar implements ICalendar{
	constructor(startDate: Date, numberOfWeeks: number){
		this.startDate = startDate;
		this.numberOfWeeks = numberOfWeeks;
		this.weeks = new Array<IWeek>();
	}

	public startDate: Date;
	public endDate: Date;
	public numberOfWeeks: number;

	public weeks: Array<IWeek>;
}