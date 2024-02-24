import {z} from "zod";

const getLc = (key: string) => {

    const value = localStorage.getItem(key)

    if (z.string().safeParse(value).success) {
        try {
            return JSON.parse(value as string)
        } catch (e) {
            return null
        }
    }

    return null
};

export default getLc;