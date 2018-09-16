import { getExpirationDate } from './helpers';

describe('Helpers', () => {
  test('should get expiration date', () => {
    expect(getExpirationDate('2018-12-31T12:30:00.000Z').toISOString()).toBe('2019-12-31T12:30:00.000Z');
    expect(getExpirationDate('2018-12-31T12:30:00.000Z', 10).toISOString()).toBe('2019-01-10T12:30:00.000Z');
  });
});
