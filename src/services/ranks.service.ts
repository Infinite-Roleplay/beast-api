import DatabaseUtil from "../utils/database.util";
import { IRank } from "../utils/interfaces/models/rank.model";

export default class RanksService {
    static async getRanks(options: any): Promise<null | IRank[]> {
        let data: IRank[] = [];

        const queryResult = await DatabaseUtil.query("SELECT * FROM ranks", []).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => ({
            id: res["id"],
            label: res["label"],
            child: await this.get({id: res["child"]}),
            permissions: await this.getPermissions(res["id"])
        })));

        return data;
    }

    static async get(options: any): Promise<null | IRank> {
        let data: null | IRank = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM ranks WHERE id=? LIMIT 1", [options.id]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            id: res["id"],
            label: res["label"],
            child: await this.get({id: res["child"]}),
            permissions: await this.getPermissions(res["id"])
        };

        return data;
    }

    static async getPermissions(id: string): Promise<string[]>{
        let data: string[] = [];

        const queryResult = await DatabaseUtil.query("SELECT permission_id FROM ranks_permissions WHERE rank_id=?", [id]).catch(() => data);

        await queryResult.forEach(async (res: any) => {
            data.push(res["permission_id"]);
        });

        return data;
    }
};