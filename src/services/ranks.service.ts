import { IRank } from "../utils/interfaces/models/rank.model";
import { IResponse } from "../utils/interfaces/response.interface";

export default {
    getRanks: async (options: any): Promise<IResponse> => {
        const data: IRank[] = [{
            "child": "<Rank>",
            "id": "<Id>",
            "label": "<string>",
            "permissions": "<Permissions>",
        }];

        return { data: data };
    },

    getId: async (options: any): Promise<IResponse> => {
        const data: IRank = {
            "child": "<Rank>",
            "id": "<Id>",
            "label": "<string>",
            "permissions": "<Permissions>",
        };

        return { data: data };
    },
};