"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
// import { seedAdmin } from "./utils/seed";
app_1.default.get('/', (req, res) => {
    res.send('Hello, TypeScript + Express!');
});
const bootStrap = async () => {
    try {
        // await seedAdmin()
        app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`server is running  on http://localhost:${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log("Failed to start server:", error);
    }
};
bootStrap();
