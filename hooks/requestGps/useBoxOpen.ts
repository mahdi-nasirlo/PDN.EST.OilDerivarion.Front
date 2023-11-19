import axios from "axios";
import {apiUrl} from "../../Constants/apiUrl";
import useSWRMutation from "swr/mutation";
import {notification} from "antd";

const UseBoxOpen = () => {

    return useSWRMutation([apiUrl.MapViewer.boxOpen.url], fetcher)

};

const fetcher = async () => {

    const res = await axios.get(apiUrl.MapViewer.boxOpen.url)

    const json = await res.data

    console.log(json)

    notification.success({message: "دستور باز شدن درب ارسال شد"})

    return json


}

export default UseBoxOpen;