const activityDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
});

export const formatActivityDate = (timestamp: number) =>
  activityDateFormatter.format(timestamp * 1000);
