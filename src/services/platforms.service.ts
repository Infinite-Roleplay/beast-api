import { IPlatform } from "../utils/interfaces/models/platform.model";
import { IResponse } from "../utils/interfaces/response.interface";

export default {
    getPlatforms: async (options: any): Promise<IResponse> => {
        const data: IPlatform[] = [{
            "id": "<Id>",
            "label": "<string>",
        }];

        return { data: data };
    },

    getId: async (options: any): Promise<IResponse> => {
        const data: IPlatform = {
            "id": "<Id>",
            "label": "<string>",
        };

        return { data: data };
    },
};