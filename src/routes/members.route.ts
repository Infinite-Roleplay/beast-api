import { Router, Request, Response, NextFunction } from "express";
import service from "../services/members.service";

const router: Router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {};

    try {
        const result = await service.getMembers(options);
        res.status(result.status || 200).send(result.data);
    } catch(err) {
        res.status(500).send({ error: err || 'Something went wrong 😕'});
    }
});

router.post('/find', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {
        "discordId": req.query.discordId,
        "steamId64": req.query.steamId64,
    };

    try {
        const result = await service.postFind(options);
        res.status(result.status || 200).send(result.data);
    } catch(err) {
        res.status(500).send({ error: err || 'Something went wrong 😕'});
    }
});

router.get('/:uuid', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {
        "uuid": req.params.uuid,
    };

    try {
        const result = await service.getUuid(options);
        res.status(result.status || 200).send(result.data);
    } catch(err) {
        res.status(500).send({ error: err || 'Something went wrong 😕'});
    }
});

export default router;