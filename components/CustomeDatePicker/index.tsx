import React, {useState} from "react";
import DatePicker, {DayValue,} from "@hassanmojab/react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {Input} from "antd";
import {jalaliToGregorian} from "shamsi-date-converter";

interface DateProps {
  year?: MonthType;
  month?: MonthType;
  day?: DayType;
}

export default function CustomDatePicker({value = {}, onChange}: { value: any, onChange: (e: any) => void }) {
  const [selectedDay, setSelectedDay] = useState<string | null>(
      // props.defaultValue as any
  );

  const renderCustomInput = ({ ref }: any) => (
    <Input
        className={" w-full"} // props.className +
      readOnly
      ref={ref}
        value={value}
        // defaultValue={props.defaultValue as string}
      placeholder="انتخاب کنید"
    />
  );

  const change = (n: DateProps | null) => {
    setSelectedDay(dateToString(n as DateProps));

    onChange(dateToString(n as DateProps))

  };

  return (
    <>
      <DatePicker
          locale="fa"
        value={stringToDate(selectedDay as string) as DayValue}
        onChange={change as any}
        inputPlaceholder="Select a date"
        shouldHighlightWeekends
          renderInput={renderCustomInput}
      />
    </>
  );
}

export function formatDateToString(
  date: [year: number, month: number, day: number] | null
): string {
  if (!date) return "";

  // const formattedMonth = date?.toString().padStart(2, '0');
  // const formattedDay = date?.day.toString().padStart(2, '0');

  return `${date[0]}/${date[1]}/${date[2]}`;
}

type MonthType = number;
type DayType = number;

function stringToDate(dateString: string): DateProps | null {
  if (!dateString) return null;

  const parts = dateString.split("/");
  if (parts.length === 3) {
    const [year, month, day] = parts.map(Number);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      return { year, month, day };
    }
  }
  return null;
}

function dateToString(date: DateProps): string {
  if (!date?.day && !date?.month && !date?.year) return "";

  const { year, month, day } = date;

  const gregorian = jalaliToGregorian(year as number, month as any, day as any);

  // console.log(formatDateToString(gregorian as any))

  // return formatDateToString(gregorian as any)
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(
    2,
    "0"
  )}`;
}
