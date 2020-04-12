import {calculateDaysDifference} from '../functions/calculate-days';
import {parseDate} from '../functions/parse-dates';
import { from } from 'rxjs';

export function calculateStayFromStringDates(startDate: string, endDate: string): number {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  return calculateDaysDifference(start, end);
}
