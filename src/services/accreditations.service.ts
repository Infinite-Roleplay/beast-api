import DatabaseUtil from "../utils/database.util";
import { IAccreditation } from "../utils/interfaces/models/accreditation.model";

export default class AccreditationsService {
    static async getAccreditations(options: any): Promise<null | IAccreditation[]> {
        let data: IAccreditation[] = [];

        const queryResult = await DatabaseUtil.query("SELECT * FROM accreditations", []).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => ({
            id: res["id"],
            label: res["label"],
            value: res["value"]
        })));

        return data;
    }

    static async get(options: any): Promise<null | IAccreditation> {
        let data: null | IAccreditation = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM accreditations WHERE id=? LIMIT 1", [options.id]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            id: res["id"],
            label: res["label"],
            value: res["value"]
        };

        return data;
    }
};