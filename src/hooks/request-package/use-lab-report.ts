import fetchWithSession from '@/utils/fetch-with-session';
import { useQuery } from '@tanstack/react-query';
import { RequestPackageApi } from 'constance/request-package';
import { z } from 'zod';

const apiData = RequestPackageApi.LabReport;

export default function useLabReport(data: z.infer<typeof apiData.type>) {
 
  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });
    
  return { ...query, ...apiData };
}
