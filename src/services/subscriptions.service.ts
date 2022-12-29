import DatabaseUtil from "../utils/database.util";
import { ISubscription } from "../utils/interfaces/models/subscription.model";
import MembersService from "./members.service";

export default class SubscriptionsService {
    static async getSubscriptions(options: any): Promise<null | ISubscription[]> {
        let data: ISubscription[] = [];

        const queryResult = await DatabaseUtil.query("SELECT * FROM subscriptions", []).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => ({
            id: res["id"],
            member: await MembersService.get({uuid: res["member_uuid"]}),
            startAt: res["start_at"],
            endAt: res["end_at"],
            type: res["type"]
        })))

        return data;
    }

    static async get(options: any): Promise<null | ISubscription> {
        let data: null | ISubscription = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM subscriptions WHERE id=? LIMIT 1", [options.id]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            id: res["id"],
            member: await MembersService.get({uuid: res["member_uuid"]}),
            startAt: res["start_at"],
            endAt: res["end_at"],
            type: res["type"]
        };

        return data;
    }
};