import  dotenv  from "dotenv";
import AppError from "../errorHelpers/appError";
import status from "http-status";


dotenv.config()

interface EnvConfig {
    NODE_ENV: string,
    PORT: string,
}

const loadEnvVariables = (): EnvConfig => {

    const requireEnvVariable = [
        'NODE_ENV',
        'PORT',
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
    }
}

export const envVars = loadEnvVariables()