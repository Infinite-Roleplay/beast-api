import DatabaseUtil from "../utils/database.util";
import { IPunishment } from "../utils/interfaces/models/punishment.model";
import MembersService from "./members.service";
import PlatformsService from "./platforms.service";

export default class PunishmentsService {
    static async getPunishments(options: any): Promise<null | IPunishment[]> {
        let data: IPunishment[] = [];

        const queryResult = await DatabaseUtil.query("SELECT * FROM punishments", []).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => ({
            id: res["id"],
            target: await MembersService.get({uuid: res["member_uuid"]}),
            by: await MembersService.get({uuid: res["by_uuid"]}),
            reason: res["reason"],
            duration: res["duration"],
            givedOn: await PlatformsService.get({id: res["give_on"]}),
            type: res["type"]
        })));

        return data;
    }

    static async get(options: any): Promise<null | IPunishment> {
        let data: null | IPunishment = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM punishments WHERE id=? LIMIT 1", [options.id]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            id: res["id"],
            target: await MembersService.get({uuid: res["member_uuid"]}),
            by: await MembersService.get({uuid: res["by_uuid"]}),
            reason: res["reason"],
            duration: res["duration"],
            givedOn: await PlatformsService.get({id: res["give_on"]}),
            type: res["type"]
        };

        return data;
    }
};