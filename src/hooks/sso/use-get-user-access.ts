import fetchWithSession from '@/utils/fetch-with-session'
import { useQuery } from '@tanstack/react-query'
import { ssoApi } from 'constance/auth'

const apiData = ssoApi.getAllUserAccess

const useGetUserAccess = () => useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({
        url: apiData.url
    })
})

export {useGetUserAccess}