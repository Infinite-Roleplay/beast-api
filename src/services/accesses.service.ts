import DatabaseUtil from "../utils/database.util";
import { IAccess } from "../utils/interfaces/models/access.model";
import AccessesCategoriesService from "./accessesCategories.service";
import AccreditationsService from "./accreditations.service";

export default class AccessesService {
    static async getAccesses(options: any): Promise<null | IAccess[]> {
        let data: IAccess[] = [];

        const queryResult = await DatabaseUtil.query("SELECT * FROM accesses", []).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => ({
            id: res["id"],
            label: res["label"],
            category: await AccessesCategoriesService.get({id: res["category"]}),
            accreditation: await AccreditationsService.get({id: res["accreditation"]}),
            color: [res["color_r"], res["color_g"], res["color_b"]],
            playermodels: res["playermodels"] ? res["playermodels"].split(",") : [],
            emoji: res["emoji"]
        })));

        return data;
    }

    static async get(options: any): Promise<null | IAccess> {
        let data: null | IAccess = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM accesses WHERE id=? LIMIT 1", [options.id]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            id: res["id"],
            label: res["label"],
            category: await AccessesCategoriesService.get({id: res["category"]}),
            accreditation: await AccreditationsService.get({id: res["accreditation"]}),
            color: [res["color_r"], res["color_g"], res["color_b"]],
            playermodels: res["playermodels"] ? res["playermodels"].split(",") : [],
            emoji: res["emoji"]
        };

        return data;
    }
};