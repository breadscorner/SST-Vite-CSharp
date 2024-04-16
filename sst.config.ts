import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import * as dotenv from "dotenv";

dotenv.config();

export default {
  config(_input) {
    return {
      name: "my-sst-app",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
