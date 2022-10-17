require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import RouterUtil from "./utils/routes.util";
import DatabaseUtil from "./utils/database.util";
import cookieParser from "cookie-parser";
import { sha512 } from "js-sha512";

const app = express();

app.set("port", process.env.SERVER_PORT);
app.set("env", process.env.NODE_ENV);

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
    const key: any = req.headers["api-key"];
    if(key) req.headers["api-key"] = sha512(key);
    next();
});

RouterUtil.init(app);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(418).send({status: "Welcome to our infinite world newbie ♾️"});
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({status: 'Not found 😞'});
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).send({status: err.status, error: err.error || err.message});
});

app.listen(process.env.SERVER_PORT, () => {
    DatabaseUtil.pool.query(`SELECT 'App Started on :${process.env.SERVER_PORT} !' as started`, (err, rows, fields) => {
        if(err) throw err;
        console.log(rows[0].started);
    });
});

export default app;