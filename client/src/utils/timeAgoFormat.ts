import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

export const timeAgo = (timestamp: string) => {
  const now = new Date();
  const createdAt = new Date(timestamp);

  const seconds = differenceInSeconds(now, createdAt);
  if (seconds < 60) return `${seconds} s ago`;

  const minutes = differenceInMinutes(now, createdAt);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = differenceInHours(now, createdAt);
  if (hours < 24) return `${hours} h ago`;

  const days = differenceInDays(now, createdAt);
  return `${days}d ago`;
};
