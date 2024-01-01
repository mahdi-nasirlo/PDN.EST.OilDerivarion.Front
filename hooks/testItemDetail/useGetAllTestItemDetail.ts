import useSWR from 'swr'
import {listFetcher} from '../../lib/server/listFetcher'

export default function useGetAllTestItemDetail(uid: string) {
    return useSWR([uid ? "/TestItemDetail/GetAll" : null, uid], ([url, arg]) => {
        if (url) {
            return listFetcher(url, {arg: {testItemUid: uid}})
        }
    })
}
