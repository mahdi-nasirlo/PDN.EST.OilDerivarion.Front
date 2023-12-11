"use server"

import {env} from "../env";

const {Client} = require("@elastic/elasticsearch");

const elasticClient = new Client({
  node: process.env.ELASTIC_URL,
  auth: {
    username: env.ELASTIC_USERNAME,
    password: env.ELASTIC_PASSWORD,
  },
});

export default elasticClient;
