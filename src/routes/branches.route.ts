import { Router, Request, Response, NextFunction } from "express";
import ResponsesUtil from "../utils/responses.util";
import service from "../services/branches.service";

const router: Router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {};

    try {
        const result = await service.getBranches(options);
        res.status(result.status || 200).send(result.data);
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {
        "id": req.params.id,
    };

    if(!options.id.match(/^[0-9]+$/)) return ResponsesUtil.invalidParameters(res);

    try {
        const result = await service.getId(options);
        res.status(result.status || 200).send(result.data);
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});

/***************************************************************
* NOT ALLOWED METHODS HANDLING
***************************************************************/

router.all('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));
router.all('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));

/**************************************************************/

export default router;