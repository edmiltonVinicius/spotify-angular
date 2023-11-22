import { addMilliseconds, format } from 'date-fns';

export function mileSecondsToMinute(ms: number): string {
  const data = addMilliseconds(new Date(), ms);
  return format(data, 'mm:ss');
}
