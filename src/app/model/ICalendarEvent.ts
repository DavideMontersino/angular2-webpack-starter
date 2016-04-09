import {ICalendar} from './ICalendar';
import {IWeek} from './IWeek';
import {IEvent} from './IEvent';

export interface ICalendarEvent {
	description: string;
	classes: string | { (curWeek: number) : string };
	event: IEvent;

	//constructor(calendar: ICalendar); TODO enable again
	InWeek(week: IWeek): boolean;
}
