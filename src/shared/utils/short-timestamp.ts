const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const shortTimestamp = (ts: number) => {
  const d = new Date(toMilliseconds(ts));
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const date = d.getDate();

  return `${date} ${month}, ${year}`;
};

export const getTimestampYear = (ts: number) => {
  const d = new Date(toMilliseconds(ts));
  return d.getFullYear();
};

const toMilliseconds = (timestamp: number) =>
  timestamp >= 1_000_000_000_000 ? timestamp : timestamp * 1000;
