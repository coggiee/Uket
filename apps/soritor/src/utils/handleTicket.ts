import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("ko");
type FormatType = "full" | "short" | "time";

const tz = "Asia/Seoul";
const format = {
  full: "YYYY년 MM월 DD일 (ddd)",
  short: "MM월 DD일 (ddd)",
  time: "HH:mm",
};

export const createBlobURL = (blob: any) => {
  return URL.createObjectURL(blob);
};

export const formatDate = (date: string, type: FormatType) => {
  return dayjs(date).utcOffset(0, true).tz(tz).format(format[type]).toString();
};
