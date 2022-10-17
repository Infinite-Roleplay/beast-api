import DatabaseUtil from "../utils/database.util";
import { IAccess } from "../utils/interfaces/models/access.model";
import { IMember } from "../utils/interfaces/models/member.model";
import AccessesService from "./accesses.service";
import RanksService from "./ranks.service";

export default class MembersService {
    static async getMembers(options: any): Promise<null | IMember[]> {
        let data: IMember[] = [];

        const queryResult = await DatabaseUtil.query("SELECT * FROM members", []).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => ({
            uuid: res["uuid"],
            discordId: res["discord_id"],
            steamId64: res["steam_id64"],
            rpname: res["rpname"],
            money: res["money"],
            rank: await RanksService.get({id: res["rank"]}),
            accesses: await this.getAccesses(res["uuid"])
        })));

        return data;
    }

    static async find(options: any): Promise<null | IMember> {
        let data: null | IMember = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM members WHERE discord_id=? OR steam_id64=? LIMIT 1", [options.discordId, options.steamId64]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            uuid: res["uuid"],
            discordId: res["discord_id"],
            steamId64: res["steam_id64"],
            rpname: res["rpname"],
            money: res["money"],
            rank: await RanksService.get({id: res["rank"]}),
            accesses: await this.getAccesses(res["uuid"])
        };

        return data;
    }

    static async get(options: any): Promise<null | IMember> {
        let data: null | IMember = null;

        const queryResult = await DatabaseUtil.query("SELECT * FROM members WHERE uuid=? LIMIT 1", [options.uuid]).catch(() => data);
        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            uuid: res["uuid"],
            discordId: res["discord_id"],
            steamId64: res["steam_id64"],
            rpname: res["rpname"],
            money: res["money"],
            rank: await RanksService.get({id: res["rank"]}),
            accesses: await this.getAccesses(res["uuid"])
        };

        return data;
    }

    static async getAccesses(uuid: string): Promise<IAccess[]>{
        let data: IAccess[] = [];

        const queryResult = await DatabaseUtil.query("SELECT access_id FROM members_accesses WHERE member_uuid=?", [uuid]).catch(() => data);

        data = await Promise.all(queryResult.map(async (res: any) => await AccessesService.get({id: res["access_id"]})));

        return data;
    }
};