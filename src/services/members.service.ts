import { IMember } from "../utils/interfaces/models/member.model";
import { IResponse } from "../utils/interfaces/response.interface";

export default {
    getMembers: async (options: any): Promise<IResponse> => {
        const data: IMember[] = [{
            "discord_id": "<string>",
            "money": "<number>",
            "rank": "<Rank>",
            "rpname": "<string>",
            "steam_id64": "<string>",
            "uuid": "<UUID>",
        }];

        return { data: data };
    },

    postFind: async (options: any): Promise<IResponse> => {
        const data: IMember = {
            "discord_id": "<string>",
            "money": "<number>",
            "rank": "<Rank>",
            "rpname": "<string>",
            "steam_id64": "<string>",
            "uuid": "<UUID>",
        };

        return { data: data };
    },

    getUuid: async (options: any): Promise<IResponse> => {
        const data: IMember = {
            "discord_id": "<string>",
            "money": "<number>",
            "rank": "<Rank>",
            "rpname": "<string>",
            "steam_id64": "<string>",
            "uuid": "<UUID>",
        };

        return { data: data };
    },
};