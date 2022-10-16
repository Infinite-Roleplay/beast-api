import { IPunishment } from "../utils/interfaces/models/punishment.model";
import { IResponse } from "../utils/interfaces/response.interface";

export default {
    getPunishments: async (options: any): Promise<IResponse> => {
        const data: IPunishment[] = [{
            "by_uuid": "<UUID>",
            "duration": "<integer>",
            "give_on": "<Platform>",
            "id": "<Id>",
            "member_uuid": "<UUID>",
            "reason": "<string>",
            "type": "<integer>",
        }];

        return { data: data };
    },

    getId: async (options: any): Promise<IResponse> => {
        const data: IPunishment = {
            "by_uuid": "<UUID>",
            "duration": "<integer>",
            "give_on": "<Platform>",
            "id": "<Id>",
            "member_uuid": "<UUID>",
            "reason": "<string>",
            "type": "<integer>",
        };

        return { data: data };
    },
};