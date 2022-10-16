import { Router, Request, Response, NextFunction } from "express";
import service from "../services/branches.service";

const router: Router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {};

    try {
        const result = await service.getBranches(options);
        res.status(result.status || 200).send(result.data);
    } catch(err) {
        res.status(500).send({ error: err || 'Something went wrong 😕'});
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {
        "id": req.params.id,
    };

    try {
        const result = await service.getId(options);
        res.status(result.status || 200).send(result.data);
    } catch(err) {
        res.status(500).send({ error: err || 'Something went wrong 😕'});
    }
});

export default router;