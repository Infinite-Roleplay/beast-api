import { Router, Request, Response, NextFunction } from "express";
import ResponsesUtil from "../utils/responses.util";

const router: Router = Router();

const roleFont: string[] = ["𝐀","𝐁","𝐂","𝐃","𝐄","𝐅","𝐆","𝐇","𝐈","𝐉","𝐊","𝐋","𝐌","𝐍","𝐎","𝐏","𝐐","𝐑","𝐒","𝐓","𝐔","𝐕","𝐖","𝐗","𝐘","𝐙","𝐚","𝐛","𝐜","𝐝","𝐞","𝐟","𝐠","𝐡","𝐢","𝐣","𝐤","𝐥","𝐦","𝐧","𝐨","𝐩","𝐪","𝐫","𝐬","𝐭","𝐮","𝐯","𝐰","𝐱","𝐲","𝐳","𝐞́","𝐞̀","𝐜̧","𝐚̀","𝐢̂","𝐞̂","𝐚̂","𝐢̈","𝐞̈","𝐚̈","𝟏","𝟐","𝟑","𝟒","𝟓","𝟔","𝟕","𝟖","𝟗","𝟎"];
const channelFont: string[] = ["𝗔","𝗕","𝗖","𝗗","𝗘","𝗙","𝗚","𝗛","𝗜","𝗝","𝗞","𝗟","𝗠","𝗡","𝗢","𝗣","𝗤","𝗥","𝗦","𝗧","𝗨","𝗩","𝗪","𝗫","𝗬","𝗭","𝗮","𝗯","𝗰","𝗱","𝗲","𝗳","𝗴","𝗵","𝗶","𝗷","𝗸","𝗹","𝗺","𝗻","𝗼","𝗽","𝗾","𝗿","𝘀","𝘁","𝘂","𝘃","𝘄","𝘅","𝘆","𝘇","𝗲́","𝗲̀","𝗰̧","𝗮̀","𝗶̂","𝗲̂","𝗮̂","𝗶̈","𝗲̈","𝗮̈","𝟭","𝟮","𝟯","𝟰","𝟱","𝟲","𝟳","𝟴","𝟵","𝟬"];
const normalComp: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzéèçàîêâïëä1234567890";

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