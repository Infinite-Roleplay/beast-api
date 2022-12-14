import { Router, Request, Response, NextFunction } from "express";
import ResponsesUtil from "../utils/responses.util";

const router: Router = Router();

const roleFont: string[] = ["๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐ ","๐ก","๐ข","๐ฃ","๐ค","๐ฅ","๐ฆ","๐ง","๐จ","๐ฉ","๐ช","๐ซ","๐ฌ","๐ญ","๐ฎ","๐ฏ","๐ฐ","๐ฑ","๐ฒ","๐ณ","๐ฬ","๐ฬ","๐ฬง","๐ฬ","๐ขฬ","๐ฬ","๐ฬ","๐ขฬ","๐ฬ","๐ฬ","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐"];
const channelFont: string[] = ["๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐ ","๐ก","๐ข","๐ฃ","๐ค","๐ฅ","๐ฆ","๐ง","๐จ","๐ฉ","๐ช","๐ซ","๐ฌ","๐ญ","๐ฎ","๐ฏ","๐ฐ","๐ฑ","๐ฒ","๐ณ","๐ด","๐ต","๐ถ","๐ท","๐ธ","๐น","๐บ","๐ป","๐ผ","๐ฝ","๐พ","๐ฟ","๐","๐","๐","๐","๐","๐","๐","๐","๐ฒฬ","๐ฒฬ","๐ฐฬง","๐ฎฬ","๐ถฬ","๐ฒฬ","๐ฎฬ","๐ถฬ","๐ฒฬ","๐ฎฬ","๐ญ","๐ฎ","๐ฏ","๐ฐ","๐ฑ","๐ฒ","๐ณ","๐ด","๐ต","๐ฌ"];
const normalComp: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzรฉรจรงร รฎรชรขรฏรซรค1234567890";

router.post('/role', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const toFormat: string = req.body.data;
    if(!toFormat || toFormat === "") return ResponsesUtil.invalidParameters(res);

    let result: string = ""
    for(let i = 0; i < toFormat.length; i++) result += roleFont[normalComp.indexOf(toFormat.charAt(i))] || toFormat.charAt(i);

    try {
        res.status(200).json({data: result});
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});

router.post('/channel', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const toFormat: string = req.body.data;
    if(!toFormat || toFormat === "") return ResponsesUtil.invalidParameters(res);

    let result: string = "";
    for(let i = 0; i < toFormat.length; i++) result += channelFont[normalComp.indexOf(toFormat.charAt(i))] || toFormat.charAt(i);

    try {
        res.status(200).json({data: result});
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});

/***************************************************************
* NOT ALLOWED METHODS HANDLING
***************************************************************/

router.all('/role', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));
router.all('/channel', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));

/**************************************************************/

export default router;