import {IEvent} from './IEvent';


export interface IWeek {
	weekOfLife: number;
	startDay: Date;
	endDay: Date;
	monthOfLife: number;
	yearOfLife: number;
	weekOfyear: number;
	weekOfMonth: number;
	monthOfYear: number;
	birthday: boolean;
	events: Array<IEvent>;
	cssClasses: string;
}
