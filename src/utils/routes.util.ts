import { Express } from "express";
import AccessesRouter from "../routes/accesses.route";
import AccessesCategories from "../routes/accessesCategories.route";
import AccreditationsRouter from "../routes/accreditations.route";
import BranchesRouter from "../routes/branches.route";
import MembersRouter from "../routes/members.route";
import PlatformsRouter from "../routes/platforms.route";
import PunishmentsRouter from "../routes/punishments.route";
import RanksRouter from "../routes/ranks.route";
import SubscriptionsRouter from "../routes/subscriptions.route";
import FormatterRouter from "../routes/formatter.route";
import AuthorizationRouter from "../routes/authorization.route";

export default class RouterUtil {
    static init(app: Express): void {
        app.use('/accesses', AccessesRouter);
        app.use('/accessesCategories', AccessesCategories);
        app.use('/accreditations', AccreditationsRouter);
        app.use('/branches', BranchesRouter);
        app.use('/members', MembersRouter);
        app.use('/platforms', PlatformsRouter);
        app.use('/punishments', PunishmentsRouter);
        app.use('/ranks', RanksRouter);
        app.use('/subscriptions', SubscriptionsRouter);
        app.use('/format', FormatterRouter);
        app.use('/authorization', AuthorizationRouter);
    }
};