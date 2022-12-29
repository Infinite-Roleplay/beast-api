import { Router, Request, Response, NextFunction } from "express";
import ResponsesUtil from "../utils/responses.util";
import service from "../services/verification.service";

const router: Router = Router();

router.get('/:key', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {
        "key": req.params.key,
    };

    if(!options.key.match(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{12}$/)) return ResponsesUtil.invalidParameters(res);

    try {
        // const result = await service.exist(options.key);s
        res.status(200).json({data: true ? "true" : "false"});
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});

router.post('/generate', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {
        "discordId": req.body.discordId,
    };

    if(!options.discordId || !options.discordId.match(/^[0-9]{18}$/)) return ResponsesUtil.invalidParameters(res);

    try {
        const generatedKey = await service.generate(options.discordId);
        res.status(200).json({data: generatedKey});
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});


/***************************************************************
* NOT ALLOWED METHODS HANDLING
***************************************************************/

router.all('/:key', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));
router.all('/generate', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));

/**************************************************************/

export default router;