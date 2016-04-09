import {IWeek} from './IWeek';

export interface ICalendar {

	startDate: Date;
	endDate: Date;
	numberOfWeeks: number;

	weeks: Array<IWeek>;
}