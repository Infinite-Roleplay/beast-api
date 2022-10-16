import { IBranch } from "../utils/interfaces/models/branch.model";
import { IResponse } from "../utils/interfaces/response.interface";

export default {
    getBranches: async (options: any): Promise<IResponse> => {
        const data: IBranch[] = [{
            "director": "<string>",
            "discord_id": "<string>",
            "id": "<Id>",
            "label": "<string>",
        }];

        return { data: data };
    },

    getId: async (options: any): Promise<IResponse> => {
        const data: IBranch = {
            "director": "<string>",
            "discord_id": "<string>",
            "id": "<Id>",
            "label": "<string>",
        };

        return { data: data };
    },
};