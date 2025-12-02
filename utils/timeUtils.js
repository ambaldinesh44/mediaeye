import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getTimeAgo = (dateString) => {
  const date = dayjs(dateString);
  const now = dayjs();
  const hoursDiff = now.diff(date, 'hour');

  // If more than 24 hours, show formatted date
  if (hoursDiff >= 24) {
    return date.format('MMMM D, YYYY');
  }

  // Otherwise show relative time
  return date.fromNow();
};
