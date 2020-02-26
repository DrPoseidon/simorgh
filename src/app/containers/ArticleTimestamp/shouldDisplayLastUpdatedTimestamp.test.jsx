import shouldDisplayLastUpdatedTimestamp, {
  hasBeenUpdated,
  publishedAndUpdatedToday,
} from './shouldDisplayLastUpdatedTimestamp';
import { timestampGenerator, sameDayTimestampsGenerator } from './testHelpers';

describe('shouldDisplayLastUpdatedTimestamp functions', () => {
  let originalDate;

  beforeEach(() => {
    originalDate = Date.now;
  });

  afterEach(() => {
    Date.now = originalDate;
  });

  describe('hasBeenUpdated', () => {
    it('should return true when the time difference between firstPublished and lastPublished in minutes is greater than the minutes tolerance', () => {
      const currentTime = originalDate();
      const twoMinutesAgo = timestampGenerator({ minutes: 2 });
      const msDifference = currentTime - twoMinutesAgo;
      const timeDifferenceMinutes = msDifference / 1000 / 60;
      const minutesTolerance = 1;
      expect(
        hasBeenUpdated({ timeDifferenceMinutes, minutesTolerance }),
      ).toEqual(true);
    });

    it('should return false when the time difference between firstPublished and lastPublished in minutes is less than the minutes tolerance', () => {
      const currentTime = originalDate();
      const fortyEightSecondsAgo = timestampGenerator({ minutes: 0.8 });
      const msDifference = currentTime - fortyEightSecondsAgo;
      const timeDifferenceMinutes = msDifference / 1000 / 60;
      const minutesTolerance = 1;
      expect(
        hasBeenUpdated({ timeDifferenceMinutes, minutesTolerance }),
      ).toEqual(false);
    });
  });

  describe('publishedAndUpdatedToday', () => {
    it(`should return true when firstPublished and lastPublished today`, () => {
      const [midnightToday, oneAmToday] = sameDayTimestampsGenerator({
        intervals: [{ hours: 1 }],
      });
      const wasPublishedAndUpdatedToday = publishedAndUpdatedToday({
        firstPublished: midnightToday,
        lastPublished: oneAmToday,
      });
      expect(wasPublishedAndUpdatedToday).toEqual(true);
    });

    it('should return false when firstPublished is not today', () => {
      const oneDayAndThreeMinutesAgo = timestampGenerator({
        days: 1,
        minutes: 3,
      });
      const oneDayAndOneMinuteAgo = timestampGenerator({ days: 1, minutes: 1 });
      const wasPublishedAndUpdatedToday = publishedAndUpdatedToday({
        firstPublished: oneDayAndThreeMinutesAgo,
        lastPublished: oneDayAndOneMinuteAgo,
      });
      expect(wasPublishedAndUpdatedToday).toEqual(false);
    });
  });

  describe('shouldDisplayLastUpdatedTiemstamp', () => {
    it('is true when article was published and updated today', () => {
      const [midnightToday, oneAmToday] = sameDayTimestampsGenerator({
        intervals: [{ hours: 1 }],
      });
      const minutesTolerance = 1;
      const shouldLastUpdatedTimestampBeDisplayed = shouldDisplayLastUpdatedTimestamp(
        {
          minutesTolerance,
          firstPublished: midnightToday,
          lastPublished: oneAmToday,
        },
      );
      expect(shouldLastUpdatedTimestampBeDisplayed).toEqual(true);
    });

    it('is true when article was lastUpdated within relative time period', () => {
      const nineHoursAgo = timestampGenerator({ hours: 9 });
      const currentTime = originalDate();
      const minutesTolerance = 1;
      const shouldLastUpdatedTimestampBeDisplayed = shouldDisplayLastUpdatedTimestamp(
        {
          minutesTolerance,
          firstPublished: nineHoursAgo,
          lastPublished: currentTime,
        },
      );
      expect(shouldLastUpdatedTimestampBeDisplayed).toEqual(true);
    });

    it('is false when article was firstPublished and lastPublished on the same day, and lastPublished is outside of the relative window', () => {
      const twentySixHoursAgo = timestampGenerator({ days: 1, hours: 2 });
      const twentyFiveHoursAgo = timestampGenerator({ days: 1, hours: 1 });
      const minutesTolerance = 1;
      const shouldLastUpdatedTimestampBeDisplayed = shouldDisplayLastUpdatedTimestamp(
        {
          minutesTolerance,
          firstPublished: twentySixHoursAgo,
          lastPublished: twentyFiveHoursAgo,
        },
      );
      expect(shouldLastUpdatedTimestampBeDisplayed).toEqual(false);
    });

    it('is true when firstUpdated and lastUpdated are on different days', () => {
      const twoDaysAgo = timestampGenerator({ days: 2 });
      const oneDayAgo = timestampGenerator({ days: 1 });
      const minutesTolerance = 1;
      const shouldLastUpdatedTimestampBeDisplayed = shouldDisplayLastUpdatedTimestamp(
        {
          minutesTolerance,
          firstPublished: twoDaysAgo,
          lastPublished: oneDayAgo,
        },
      );
      expect(shouldLastUpdatedTimestampBeDisplayed).toEqual(true);
    });
  });
});
