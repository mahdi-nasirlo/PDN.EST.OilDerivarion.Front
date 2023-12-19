import customeFetcher from "../server/customeFetcher";

const createLog = async (type: string, data: any,) => {
    try {
        await customeFetcher({
            url: {path: "/api/front/logger/reporast", absolute: true},
        method: "POST",
        data: {
            type: type,
            data: data
        },
        notify: false,
    })
    } catch (e) {
        console.log(e)
    }
};

export default createLog;