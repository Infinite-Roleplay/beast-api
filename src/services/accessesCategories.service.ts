import DatabaseUtil from "../utils/database.util";
import { IAccessesCategory } from "../utils/interfaces/models/accessesCategory.model";
import BranchesService from "./branches.service";

export default class AccessesCategoriesService {
    static async getAccessesCategories(options: any): Promise<null | IAccessesCategory[]> {
        let data: IAccessesCategory[] = [];

        const queryResult = await DatabaseUtil.query("SELECT * FROM accesses_categories", []).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => ({
            id: res["id"],
            label: res["label"],
            child: await this.get({id: res["child"]}),
            belongTo: await BranchesService.get({id: res["belonging_to"]})
        })));

        return data;
    }

    static async get(options: any): Promise<null | IAccessesCategory> {
        let data: null | IAccessesCategory = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM accesses_categories WHERE id=? LIMIT 1", [options.id]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            id: res["id"],
            label: res["label"],
            child: await this.get({id: res["child"]}),
            belongTo: await BranchesService.get({id: res["belonging_to"]})
        };

        return data;
    }
};