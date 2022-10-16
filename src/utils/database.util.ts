require("dotenv").config();
import mysql from 'mysql';

export default class DatabaseUtil {
    static get pool(): mysql.Pool {
        return mysql.createPool({
            connectionLimit : 10,
            debug: false,
            password: process.env.DB_PASSWORD,
            host: "127.0.0.1",
            user: "beast",
            port: 3306,
            database: "infinite",
        });
    }
}