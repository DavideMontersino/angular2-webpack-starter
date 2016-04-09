import {ICalendar} from './ICalendar';
import {IWeek} from './IWeek';

export interface ICalendarEvent {
	description: string;
	classes: string | { (curWeek: number) : string };

	//constructor(calendar: ICalendar); TODO enable again
	InWeek(week: IWeek): boolean;
}