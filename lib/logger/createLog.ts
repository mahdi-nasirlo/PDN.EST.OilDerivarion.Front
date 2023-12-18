import customeFetcher from "../server/customeFetcher";

const createLog = async (type: string, data: any,) => {

    return await customeFetcher({
        url: {path: "/api/auth/logger/report", absolute: true},
        method: "POST",
        data: {
            type: type,
            data: data
        },
        notify: false,
    })
};

export default createLog;