import customFetcher, { customFetcherType } from './custome-fetcher';
import getTokenFromSession from './get-token-from-session';

export default async function fetchWithSession(props: customFetcherType) {
  
    const access_token = await getTokenFromSession()

    return await customFetcher({...props, token: access_token as string})

}
