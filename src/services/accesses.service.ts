import DatabaseUtil from "../utils/database.util";
import { IAccess, IRole } from "../utils/interfaces/models/access.model";
import AccessesCategoriesService from "./accessesCategories.service";
import AccreditationsService from "./accreditations.service";
import BranchesService from "./branches.service";

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
            emoji: res["emoji"],
            roles: await this.getRoles(res["id"]),
            prefix: res["prefix"],
            suffix: res["suffix"]
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
            emoji: res["emoji"],
            roles: await this.getRoles(res["id"]),
            prefix: res["prefix"],
            suffix: res["suffix"]
        };

        return data;
    }

    static async getRoles(id: string): Promise<IRole[]>{
        let data: IRole[] = [];

        const queryResult = await DatabaseUtil.query("SELECT role_id FROM accesses_roles WHERE access_id=?", [id]).catch(() => data);

        await queryResult.forEach(async (res: any) => {
            data.push({
                id: res["role_id"],
                on: await BranchesService.get(res["role_on"])
            });
        });

        return data;
    }
};