import React from 'react'
import useSWR from 'swr'
import { listFetcher } from '../../lib/server/listFetcher'

export  const  useGetAllState = () => useSWR("/BaseInfo/StateGetAll", listFetcher)
