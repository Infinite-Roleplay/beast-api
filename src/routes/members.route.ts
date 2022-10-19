import { Router, Request, Response, NextFunction } from "express";
import ResponsesUtil from "../utils/responses.util";
import service from "../services/members.service";
import ActorsUtil from "../utils/actors.util";

const router: Router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!await ActorsUtil.isAuthorized(req.headers["api-key"])) return ResponsesUtil.unauthorizedAction(res);

    let options = {};

    try {
        const result = await service.getMembers(options);
        if(!result) ResponsesUtil.notFound(res);
        else res.status(200).json({data: result});
    } catch(err) { 
        console.log(err)
        return ResponsesUtil.somethingWentWrong(res)
    }
});

router.post('/find', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!await ActorsUtil.isAuthorized(req.headers["api-key"])) return ResponsesUtil.unauthorizedAction(res);

    let options = {
        "discordId": req.body.discordId,
        "steamId64": req.body.steamId64,
    };

    if((options.discordId && !options.discordId.match(/^[0-9]{18}$/))
    || (options.steamId64 && !options.steamId64.match(/^[0-9]{17}$/))) return ResponsesUtil.invalidParameters(res);

    try {
        const result = await service.find(options);
        if(!result) ResponsesUtil.notFound(res);
        else res.status(200).json({data: result});
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});

router.get('/:uuid', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!await ActorsUtil.isAuthorized(req.headers["api-key"])) return ResponsesUtil.unauthorizedAction(res);

    let options = {
        "uuid": req.params.uuid,
    };

    if(!options.uuid.match(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/)) return ResponsesUtil.invalidParameters(res);

    try {
        const result = await service.get(options);
        if(!result) ResponsesUtil.notFound(res);

        else res.status(200).json({data: result});
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!await ActorsUtil.isAuthorized(req.headers["api-key"])) return ResponsesUtil.unauthorizedAction(res);

    let options = {
        "discordId": req.body.discordId,
        "steamId64": req.body.steamId64,
    };

    if((options.discordId && !options.discordId.match(/^[0-9]{18}$/))
    || (options.steamId64 && !options.steamId64.match(/^[0-9]{17}$/))) return ResponsesUtil.invalidParameters(res);

    if(!options.discordId && !options.steamId64) return ResponsesUtil.invalidParameters(res);

    try {
        const result = await service.post(options.discordId, options.steamId64);
        res.status(200).json({success: result ? "true" : "false"});
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});

/***************************************************************
* NOT ALLOWED METHODS HANDLING
***************************************************************/

router.all('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));
router.all('/find', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));
router.all('/:uuid', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));

/**************************************************************/

export default router;