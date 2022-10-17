import { Response } from "express";

export default class ResponsesUtil {
    static unauthorizedAction(res: Response): void {
        res.status(401).send({error: 'Unauthorized action 👮'});
    }

    static methodNotAllowed(res: Response): void {
        res.status(405).send({ error: 'Method Not Allowed 💃'});
    }

    static invalidParameters(res: Response): void {
        res.status(412).send({error: 'Invalid parameters 😵‍💫'});
    }

    static somethingWentWrong(res: Response): void {
        res.status(500).send({ error: 'Something went wrong 😕'});
    }
    
    static notFound(res: Response): void {
        res.status(404).send({ error: 'We don\'t found what you are looking for 😔'});
    }
}