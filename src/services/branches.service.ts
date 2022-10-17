import DatabaseUtil from "../utils/database.util";
import { IBranch } from "../utils/interfaces/models/branch.model";
import MembersService from "./members.service";

export default class BranchesService {
    static async getBranches(options: any): Promise<null | IBranch[]> {
        let data: IBranch[] = [];

        const queryResult = await DatabaseUtil.query("SELECT * FROM branches", []).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => ({
            id: res["id"],
            label: res["label"],
            discordServerId: res["discord_id"],
            director: await MembersService.get({uuid: res["director"]})
        })));

        return data;
    }

    static async get(options: any): Promise<null | IBranch> {
        let data: null | IBranch = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM branches WHERE id=? LIMIT 1", [options.id]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            id: res["id"],
            label: res["label"],
            discordServerId: res["discord_id"],
            director: await MembersService.get({uuid: res["director"]})
        };

        return data;
    }
};