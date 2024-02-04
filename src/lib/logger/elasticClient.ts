import {env} from "../env";

const {Client} = require("@elastic/elasticsearch");

export const elasticClient = new Client({
    node: env.ELASTIC_URL,
    auth: {
        username: env.ELASTIC_USERNAME,
        password: env.ELASTIC_PASSWORD,
    },
});