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

  const totalWeeks: { [key: number]: boolean } = {};
  timestampArr.map((timestamp, idx) => {
    const date = moment(timestamp);
    const dayOfWeek = date.locale('en').format('ddd') as DayOfWeek;
    const hour = date.format('HH');
    if (!totalWeeks[date.week()]) {
      totalWeeks[date.week()] = true;
    }

    if (dayOfWeek !== 'Sun' && hours.includes(hour)) {
      templateTable[mappingWeekToArrayIndex[dayOfWeek]][hour] += valueArr[idx];
    }
  });

  const numberOfWeeks = Object.keys(totalWeeks).length;
  for (let i = 0; i < 6; i++) {
    hours.map(hour => {
      if (templateTable[i][hour] == 0) {
        templateTable[i][hour] = null;
      } else {
        if (numberOfWeeks > 1) {
          templateTable[i][hour] = Math.round((templateTable[i][hour] / numberOfWeeks) * 10) / 10;
        } else {
          templateTable[i][hour] = Math.round(templateTable[i][hour] * 10) / 10;
        }
      }
    });
  }
  return { data: templateTable };
};
