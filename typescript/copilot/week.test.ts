import { getWeekDay, Week } from './week';

describe('getWeekDay', () => {
  it('should return Week.Sun for a timestamp corresponding to Sunday', () => {
    const time = new Date('2023-01-01T00:00:00Z').getTime();
    const result = getWeekDay(time);
    expect(result).toEqual(Week.Sun);
  });

  it('should return Week.Mon for a timestamp corresponding to Monday', () => {
    const time = new Date('2023-01-02T00:00:00Z').getTime();
    const result = getWeekDay(time);
    expect(result).toEqual(Week.Mon);
  });

  it('should return Week.Tue for a timestamp corresponding to Tuesday', () => {
    const time = new Date('2023-01-03T00:00:00Z').getTime();
    const result = getWeekDay(time);
    expect(result).toEqual(Week.Tue);
  });

  it('should return Week.Wed for a timestamp corresponding to Wednesday', () => {
    const time = new Date('2023-01-04T00:00:00Z').getTime();
    const result = getWeekDay(time);
    expect(result).toEqual(Week.Wed);
  });

  it('should return Week.Thu for a timestamp corresponding to Thursday', () => {
    const time = new Date('2023-01-05T00:00:00Z').getTime();
    const result = getWeekDay(time);
    expect(result).toEqual(Week.Thu);
  });

  it('should return Week.Fri for a timestamp corresponding to Friday', () => {
    const time = new Date('2023-01-06T00:00:00Z').getTime();
    const result = getWeekDay(time);
    expect(result).toEqual(Week.Fri);
  });

  it('should return Week.Sat for a timestamp corresponding to Saturday', () => {
    const time = new Date('2023-01-07T00:00:00Z').getTime();
    const result = getWeekDay(time);
    expect(result).toEqual(Week.Sat);
  });
});
