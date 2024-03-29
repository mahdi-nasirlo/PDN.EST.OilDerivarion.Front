import customeFetcher from "../server/customeFetcher";

const createLog = async (type: string, data: any,) => {
    try {
        customeFetcher({
            url: {path: "/api/front/logger/report", absolute: true},
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