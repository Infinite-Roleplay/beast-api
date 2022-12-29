import DatabaseUtil from "../utils/database.util";
import { IPlatform } from "../utils/interfaces/models/platform.model";

export default class PlatformsService {
    static async getPlatforms(options: any): Promise<null | IPlatform[]> {
        let data: IPlatform[] = [];

        const queryResult = await DatabaseUtil.query("SELECT * FROM platforms", []).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => ({
            id: res["id"],
            label: res["label"]
        })));

        return data;
    }

    static async get(options: any): Promise<null | IPlatform> {
        let data: null | IPlatform = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM platforms WHERE id=? LIMIT 1", [options.id]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            id: res["id"],
            label: res["label"]
        };

        return data;
    }
};