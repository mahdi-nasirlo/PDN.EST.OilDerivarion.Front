import { url } from 'inspector';
import React from 'react'
import useSWR from 'swr'
import { listFetcher } from '../../lib/server/listFetcher'

export  const  useGetAllCity = (id: number | string) => useSWR(id ? "/BaseInfo/CityGetAll": null, (url: string) => listFetcher(url, {arg: {stateId: id}}))
