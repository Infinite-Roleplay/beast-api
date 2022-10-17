require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import RouterUtil from "./utils/routes.util";
import DatabaseUtil from "./utils/database.util";
import cookieParser from "cookie-parser";
import { sha512 } from "js-sha512";
import ResponsesUtil from "./utils/responses.util";
import multer from "multer";

const upload = multer();
const app = express();

app.set("port", process.env.SERVER_PORT);
app.set("env", process.env.NODE_ENV);

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.use(upload.array("data"));
app.use(express.static('public'));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
    const key: any = req.headers["api-key"];
    if(key) req.headers["api-key"] = sha512(key);
    next();
});

RouterUtil.init(app);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({status: "Welcome to our infinite world newbie ♾️"});
});

app.use((req: Request, res: Response, next: NextFunction) => {
    ResponsesUtil.notFound(res);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    ResponsesUtil.somethingWentWrong(res);
});

app.listen(process.env.SERVER_PORT, () => {
    DatabaseUtil.pool.query(`SELECT 'App Started on :${process.env.SERVER_PORT} !' as started`, (err, rows, fields) => {
        if(err) throw err;
        console.log(rows[0].started);
    });
});

export default app;