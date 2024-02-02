import {useState} from "react";
import getPageRecordNumber from "@/utils/getPageRecordNumber";

interface TProps {
    fromRecord: number,
    selectRecord: number
}

const useHandleFilter = <T>() => {

    const pageRecord = getPageRecordNumber()

    const [filter, setFilter] = useState<T & { fromRecord: number, selectRecord: number }>(pageRecord as T & {
        fromRecord: number,
        selectRecord: number
    })

    const handleSetFilter = (newArg: (x: T & { fromRecord: number, selectRecord: number }) => T & {
        fromRecord: number,
        selectRecord: number
    } | (T & {
        fromRecord: number,
        selectRecord: number
    })) => {

        let newFilter
        if (typeof newArg === "function") {
            newFilter = newArg(filter)
        } else
            newFilter = newArg

        if (newFilter.fromRecord && newFilter.selectRecord) {
            // console.log(newFilter)
            setFilter(newFilter)
        } else {
            // console.log({...pageRecord, ...newFilter})
            setFilter({...newFilter, ...pageRecord})
        }
    }

    return {filter, setFilter: handleSetFilter}
};

export default useHandleFilter;