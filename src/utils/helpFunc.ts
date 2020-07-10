import { hours, weekdays, mappingWeekToArrayIndex } from '../config/constant';
import { DayObj, DayOfWeek } from '../types';
import moment from 'moment';

export const processData = (valueArr: number[], timestampArr: number[]) => {
  const templateTable = weekdays.map(weekday => {
    const obj: DayObj = { date: weekday };
    hours.map(hour => {
      obj[hour] = 0;
    });
    return obj;
  });

  timestampArr.map((timestamp, idx) => {
    const date = moment(timestamp);
    const dayOfWeek = date.locale('en').format('ddd') as DayOfWeek;
    const hour = date.format('HH');
    if (dayOfWeek !== 'Sun' && hours.includes(hour)) {
      templateTable[mappingWeekToArrayIndex[dayOfWeek]][hour] += valueArr[idx];
    }
  });

  for (let i = 0; i < 7; i++) {
    hours.map(hour => {
      if (templateTable[i][hour] == 0) {
        templateTable[i][hour] = null;
      } else {
        templateTable[i][hour] = Math.round(templateTable[i][hour] * 10) / 10;
      }
    });
  }
  return { data: templateTable };
};
