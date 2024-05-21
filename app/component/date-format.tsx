import { FORMAT_DAY_MONTH_YEAR } from "../config/settings";
import dayjs from "dayjs";

interface DateFormatProps {
  date: Date;
}

export function DateFormat(props: Readonly<DateFormatProps>) {
  const formatDate = dayjs(props.date).format(FORMAT_DAY_MONTH_YEAR);

  return <span>{formatDate}</span>;
}
