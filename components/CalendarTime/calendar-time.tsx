import { Descriptions, Spin } from "antd";
import React from "react";

interface CalendarData {
  solar_fulldate: "string";
}

interface data {
  data: CalendarData[] | undefined;
  loading?: boolean;
}

const CalendarTime: React.FC<data> = ({ data, loading }) => {
  if (loading) {
    return <Spin />;
  }

  return (
    <>
      {data && (
        <div className="p-4">
          <Descriptions
            className="text-right text-secondary-500"
            title="تاریخ های مجاز"
          >
            {data?.map((calendarEntry, index) => (
              <>
                <Descriptions.Item label="تاریخ">
                  {`${calendarEntry.solar_fulldate}`}
                </Descriptions.Item>
              </>
            ))}
          </Descriptions>
        </div>
      )}
    </>
  );
};

export default CalendarTime;
