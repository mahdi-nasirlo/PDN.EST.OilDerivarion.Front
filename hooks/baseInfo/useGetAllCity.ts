import useSWR from 'swr'
import { listFetcher } from '../../lib/server/listFetcher'

export  const  useGetAllCity = (id: number | string| undefined) => 
useSWR(
    ["/BaseInfo/CityGetAll", id],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg: {stateId: id || 1}}))
