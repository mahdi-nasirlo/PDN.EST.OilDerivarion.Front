import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

const UseGetAllGpsDeviceTracker = () => {

    const {isLoading, mutate, isValidating, data} = useSWR(
        "/RequestGPS/GetAll_GpsDevice",
        url => listFetcher(url, {
            arg: {
                "gpsDeviceId": 216
            }
        }),
        {
            refreshInterval: 30000
        }
    )

    return {isLoading: isLoading || isValidating, data, mutate}
};

export default UseGetAllGpsDeviceTracker;