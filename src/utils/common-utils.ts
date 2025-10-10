import instance from "@/apis/instance";
import axios from "axios";
import moment from "moment-timezone";
import { formatUnits } from "viem";

export const getFormattedDate = (date: string) => {
  return moment
    .tz(new Date(date), "UTC")
    .tz("Asia/Ho_Chi_Minh")
    .format("DD-MM-YYYY HH:mm:ss");
};

export const getFormattedDateFromUnix = (date: number) => {
  return moment.unix(date).tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY HH:mm:ss");
};

export const getShortAddress = (walletAddress: string) => {
  return (
    walletAddress.substring(0, 5) +
    "..." +
    walletAddress.substring(walletAddress.length - 5)
  );
};

export const getFormatDateToHour = (dateStr: Date) => {
  const date = moment.utc(dateStr).tz("Europe/London");
  const timeString = date.format("HH:mm:ss");
  return timeString;
};

export const getFormatDateToDay = (dateStr: Date) => {
  const date = moment.utc(dateStr).tz("Europe/London");
  const dateString = date.format("DD/MM/YYYY");
  return dateString;
};

// export const calculateTargetDate = (time, month) => {
//   const date = new Date(time);
//   date.setMonth(date.getMonth() + month);
//   return date;
// };

export const formatNumber = (value: bigint, decimals: number) => {
  return formatUnits(value, decimals);
};

export const navigateLink = (path: string, inviteCode?: string) => {
  if (inviteCode) {
    return path + "?inviteCode=" + inviteCode;
  } else {
    return path;
  }
};
