export enum Week {
  Sun = 'Sun',
  Mon = 'Mon',
  Tue = 'Tue',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat'
}

export function getWeekDay(time: number): Week {
  const date = new Date(time);
  const weekDay = date.getDay();
  switch (weekDay) {
    case 0:
      return Week.Sun;
    case 1:
      return Week.Mon;
    case 2:
      return Week.Tue;
    case 3:
      return Week.Wed;
    case 4:
      return Week.Thu;
    case 5:
      return Week.Fri;
    case 6:
      return Week.Sat;
    default:
      throw new Error('Invalid week day');
  }
}
