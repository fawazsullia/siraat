//implements singleton pattern to init db
import dotenv from "dotenv"
import Mongoose from "mongoose"
dotenv.config()

const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;


const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

class DbConfig {
    init(){
        return Mongoose.connect(DB_URL, { writeConcern : {w: "majority"} })
    }
}

const dbConfig = Object.freeze(new DbConfig());

export default dbConfig;