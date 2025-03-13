import { DateArg, format, FormatOptions } from "date-fns";
import React, { ComponentPropsWithRef } from "react";

interface DateTimeProps extends ComponentPropsWithRef<"p"> {
  date: DateArg<Date> & {};
  formatStr: string;
  options?: FormatOptions;
}

const DateTime = ({ date, formatStr, options, ...rest }: DateTimeProps) => {
  return (
    <p className="text-xs" {...rest}>
      {format(date, formatStr, options)}
    </p>
  );
};

export default DateTime;
