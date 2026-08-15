import dotenv from "dotenv";
import AppError from "../errorHelpers/appError";
import status from "http-status";


dotenv.config()

interface EnvConfig {
    NODE_ENV: string,
    PORT: string,
    MONGODB_URI: string,

    ACCESS_TOKEN_SECRET: string,
    REFRESH_TOKEN_SECRET: string,
    ACCESS_TOKEN_EXPIRES_IN: string,
    REFRESH_TOKEN_EXPIRES_IN: string,
}

const loadEnvVariables = (): EnvConfig => {

    const requireEnvVariable = [
        'NODE_ENV',
        'PORT',
        "MONGODB_URI",
        'ACCESS_TOKEN_SECRET',
        'REFRESH_TOKEN_SECRET',
        'ACCESS_TOKEN_EXPIRES_IN',
        'REFRESH_TOKEN_EXPIRES_IN',
    ]

    requireEnvVariable.forEach((variable) => {
        const key = variable.trim();
        if (!process.env[key]) {
            throw new AppError(status.INTERNAL_SERVER_ERROR, `Environment variable is ${key} required but not set in .env file.`)
        }
    })
    return {
        NODE_ENV: process.env.NODE_ENV as string,
        PORT: process.env.PORT as string,
        MONGODB_URI: process.env.MONGODB_URI as string,


        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
        REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    }
}

export const envVars = loadEnvVariables()