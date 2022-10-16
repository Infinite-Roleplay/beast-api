import { IAccreditation } from "../utils/interfaces/models/accreditation.model";
import { IResponse } from "../utils/interfaces/response.interface";

export default {
    getAccreditations: async (options: any): Promise<IResponse> => {
        const data: IAccreditation[] = [{
            "id": "<Id>",
            "label": "<string>",
            "value": "<string>",
        }];

        return { data: data };
    },

    getId: async (options: any): Promise<IResponse> => {
        const data: IAccreditation = {
            "id": "<Id>",
            "label": "<string>",
            "value": "<string>",
        };

        return { data: data };
    },
};