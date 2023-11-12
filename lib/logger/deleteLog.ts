"use server"

import elasticClient from "./elasticClient";


const deleteLog = async () => {

    try {

        const deleteRequest = await elasticClient.indices.delete({index: "oil-front"})

        const createRequest = await elasticClient.indices.create({index: "oil-front"})

        return true

    } catch (e: any) {

        return false

    }

}

export default deleteLog