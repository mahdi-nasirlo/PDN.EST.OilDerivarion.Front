function getUrlWithParams(url: string, params: any) {

    let joinedParams = '';
    if (params) {
        const mappedParams = Object.keys(params).map(item => `${item}=${params[item]}`)
        joinedParams = `?${mappedParams.join('&')}`
    }

    return `${url}${joinedParams}`
}

export default getUrlWithParams;