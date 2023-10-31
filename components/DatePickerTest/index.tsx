import React, {useEffect, useState} from "react";
import DatePicker, {DayValue} from "@hassanmojab/react-modern-calendar-datepicker";
import {Input, Typography} from "antd";
import {InputProps} from "antd/lib";

interface DateProps {
    year?: MonthType;
    month?: MonthType;
    day?: DayType;
}

export default function Index(props: InputProps) {
    const [selectedDay, setSelectedDay] = useState<DateProps | null>(
        props.defaultValue as any
    );

    const renderCustomInput = ({ref}: any) => (
        <Input
            {...props}
            readOnly
            ref={ref}
            value={dateToString(selectedDay as DateProps) || ""}
        />
    );

    useEffect(() => {
        change(selectedDay);
    }, [selectedDay]);

    const change = (n: DateProps | null) => {
        setSelectedDay(n);
        if (typeof props.onChange === "function") {
            props.onChange(selectedDay as any);
        }
    };

    return (
        <>
            <Typography>
                {JSON.stringify(selectedDay)}
            </Typography>
            <DatePicker
                locale="fa"
                value={selectedDay as DayValue}
                onChange={change as any}
                inputPlaceholder="Select a date"
                shouldHighlightWeekends
                renderInput={renderCustomInput}
            />
        </>
    );
}

// export function formatDateToString(date: DateProps | null): string {
//
//     if (!date?.day && !date?.month && !date?.year)
//         return ""
//
//     const formattedMonth = date?.month.toString().padStart(2, '0');
//     const formattedDay = date?.day.toString().padStart(2, '0');
//
//     return `${date?.year}/${formattedMonth}/${formattedDay}`;
// }


type MonthType = number;
type DayType = number;

function stringToDate(dateString: string): DateProps | null {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const [year, month, day] = parts.map(Number);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            return {year, month, day};
        }
    }
    return null;
}

function dateToString(date: DateProps): string {

    if (!date?.day && !date?.month && !date?.year)
        return ""

    const {year, month, day} = date;
    return `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
}
