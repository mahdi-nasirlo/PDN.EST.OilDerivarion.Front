"use server"

import elasticClient from "./elasticClient";


const deleteLog = async () => {

    console.log("test")

    const deleteRequest = await elasticClient.indices.delete({index: "oil-front"})

    const createRequest = await elasticClient.indices.create({index: "oil-front"})

    console.log(deleteRequest, createRequest)

    return deleteRequest
}

export default deleteLog