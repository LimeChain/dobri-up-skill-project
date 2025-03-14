import { ComponentPropsWithRef } from "react";
import { timeAgo } from "@/utils/timeAgoFormat";

interface TimeAgoProps extends ComponentPropsWithRef<"p"> {
  date: string;
}

const TimeAgo = ({ date, ...rest }: TimeAgoProps) => {
  return (
    <p className="text-xs" {...rest}>
      {timeAgo(date)}
    </p>
  );
};

export default TimeAgo;
