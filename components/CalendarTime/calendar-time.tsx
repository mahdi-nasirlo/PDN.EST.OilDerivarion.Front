import { Descriptions, Spin } from 'antd';
import React from 'react';

interface CalendarData {
    gregorian_year: number;
    gregorian_month: number;
    gregorian_day: number;
}

interface data {
    data: CalendarData[] | undefined;
}

const CalendarTime: React.FC<data> = ({ data }) => {

    if (!data) {
        return <Spin />;
    }

    return (
        <>
            <div className='p-4'>
                <Descriptions className='text-right text-secondary-500' title="تاریخ های مجاز">
                    {data.map((calendarEntry, index) => (<>
                        <Descriptions.Item label="تاریخ">
                            {`${calendarEntry.gregorian_year}/${calendarEntry.gregorian_month}/${calendarEntry.gregorian_day}`}
                        </Descriptions.Item>
                    </>))}
                </Descriptions>
            </div>
        </>
    );
};

export default CalendarTime;
