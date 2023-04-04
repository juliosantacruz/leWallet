import React from "react";

export default function useTime() {
  const monthDigit = (digit: number) => {
    const digits = digit + 1;
    let res;
    if (!(digits === 2)) {
      res = `0${digits}`;
    } else {
      res = digits.toString();
    }
    return res;
  };
  const dayDigit = (digit: number) => {
    let res;
    if (!(digit >= 10)) {
      res = `0${digit}`;
    } else {
      res = digit.toString();
    }
    return res;
  };
  const getToday = (date: any) => {
    const todayYear = date.$y.toString();
    const todayMonth = monthDigit(date.$M);
    const todayDay = dayDigit(date.$D);
    const todayString = `${todayYear}-${todayMonth}-${todayDay}`;
    return todayString;
  };

  return { monthDigit, dayDigit, getToday };
}
