import { ComponentPropsWithRef } from "react";
import { DateArg, format, FormatOptions } from "date-fns";

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
