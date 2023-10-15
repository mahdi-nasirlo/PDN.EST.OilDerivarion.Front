import React from 'react';
import {DatePicker} from "antd";

import "../../lib/dayjs"
import moment from "jalali-moment";
import dayjs from "dayjs";
import {DatePickerProps} from "antd/lib";

function CustomDatePicker(props: DatePickerProps) {

    const currentDate = new Date();

    const today: string = moment(currentDate).locale("fa").format('YYYY-MM-DD')

    return (
        <DatePicker {...props} defaultValue={dayjs(today, 'YYYY-MM-DD')}/>
    );
}

export default CustomDatePicker;