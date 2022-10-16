import { IAccess } from "../utils/interfaces/models/access.model";
import { IResponse } from "../utils/interfaces/response.interface";

export default {
    getAccesses: async (options: any): Promise<IResponse> => {
        const data: IAccess[] = [{
            "accreditation": "<Accreditation>",
            "category": "<AccessesCategory>",
            "color_b": "<integer>",
            "color_g": "<integer>",
            "color_r": "<integer>",
            "description": "<string>",
            "emoji": "<string>",
            "id": "<Id>",
            "label": "<string>",
            "playermodels": "<array>",
        }];

        return { data: data };
    },

    getId: async (options: any): Promise<IResponse> => {
        const data: IAccess = {
            "accreditation": "<Accreditation>",
            "category": "<AccessesCategory>",
            "color_b": "<integer>",
            "color_g": "<integer>",
            "color_r": "<integer>",
            "description": "<string>",
            "emoji": "<string>",
            "id": "<Id>",
            "label": "<string>",
            "playermodels": "<array>",
        };

        return { data: data };
    },
};