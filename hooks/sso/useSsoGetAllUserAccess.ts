import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";
import {ItemType} from "antd/lib/menu/hooks/useItems";

type dataType = { nameFa: string, url: string }[]

const useSsoGetAllUserAccess = () => {

    const request = useSWR<dataType>("/Sso/GetAllUserAccess", listFetcher)

    let items: ItemType[] = []

    if (Array.isArray(request.data)) {
        request.data?.map((value, index) => {

            items?.push({
                label: value.nameFa,
                // children: value.nameFa,
                key: value.url
            })

        })
    }

    return {...request, items}

};

export default useSsoGetAllUserAccess;