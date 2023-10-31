import React, {useState} from 'react';
import DatePicker from "react-multi-date-picker"

const Index = (props: any) => {

    const [value, setValue] = useState()

    function handleChange(value: any) {
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        setValue(value)
    }

    return (
        <>
            <input  {...props} defaultValue={value}/>
            <DatePicker
                value={value}
                onChange={handleChange}
            />
        </>
    );
};


export default Index;