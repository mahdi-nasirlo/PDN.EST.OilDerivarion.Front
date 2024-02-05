import * as process from "process";

const {Client} = require("@elastic/elasticsearch");

export const elasticClient = new Client({
    node: process.env.ELASTIC_URL,
    auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD,
    },
});