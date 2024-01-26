import fetchWithSession from '@/utils/fetch-with-session'
import { useQuery } from '@tanstack/react-query'
import { ItemType, MenuItemType } from 'antd/lib/menu/hooks/useItems'
import { ssoApi } from 'constance/auth'
import { z } from 'zod'

const apiData = ssoApi.getAllUserAccess

const useGetUserAccess = () => useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({
        url: apiData.url
    }),
    select: (data: z.infer<typeof apiData.response>): ItemType<MenuItemType>[] | undefined =>
        data.data?.map((item, index) => ({ key: item.url, label: item.nameFa }))
})

export {useGetUserAccess}