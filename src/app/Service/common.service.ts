import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private datePipe: DatePipe) { }

  getDefaultDate(): string {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Months are zero-based, so we add 1
    const currentDay = today.getDate();

    const fallStartDate = new Date(today.getFullYear(), 7, 16); // August 16th
    const winterStartDate = new Date(today.getFullYear(), 11, 16); // December 16th
    const springStartDate = new Date(today.getFullYear(), 1, 1); // February 1st
    const summerStartDate = new Date(today.getFullYear(), 4, 16); // May 16th

    let defaultDate: Date;

    if (
      (today >= fallStartDate && today <= winterStartDate) ||
      (today >= winterStartDate && today <= springStartDate) ||
      (today >= springStartDate && today <= summerStartDate) ||
      (today >= summerStartDate && today <= fallStartDate)
    ) {
      // If today falls within any of the defined date ranges, use the start date of the next season as the default date
      if (currentMonth >= 1 && currentMonth < 5) {
        defaultDate = summerStartDate;
      } else if (currentMonth >= 5 && currentMonth < 8) {
        defaultDate = fallStartDate;
      } else if (currentMonth >= 8 && currentMonth < 12) {
        defaultDate = winterStartDate;
      } else {
        defaultDate = springStartDate;
      }
    } else {
      // If today is outside the defined date ranges, use the start date of the current season as the default date
      if (currentMonth >= 1 && currentMonth < 5) {
        defaultDate = springStartDate;
      } else if (currentMonth >= 5 && currentMonth < 8) {
        defaultDate = summerStartDate;
      } else if (currentMonth >= 8 && currentMonth < 12) {
        defaultDate = fallStartDate;
      } else {
        defaultDate = winterStartDate;
      }
    }

    const defaultDateString = `${defaultDate.getFullYear()+1}-${(defaultDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${defaultDate.getDate().toString().padStart(2, '0')}`;

    return defaultDateString;
  }


  getFormattedDate(dateString: string): any {
    // Split the date string and create a JavaScript Date object
    const dateParts = dateString.split('-');
    const jsDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

    // Use the DatePipe to format the date
    return this.datePipe.transform(jsDate, 'MM/dd/yyyy');
  }
}
