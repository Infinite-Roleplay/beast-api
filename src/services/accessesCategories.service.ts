import { IAccessesCategory } from "../utils/interfaces/models/accessesCategory.model";
import { IResponse } from "../utils/interfaces/response.interface";

export default {
    getAccessesCategories: async (options: any): Promise<IResponse> => {
        const data: IAccessesCategory[] = [{
            "belonging_to": "<Branch>",
            "child": "<AccessesCategory>",
            "id": "<Id>",
            "label": "<string>",
        }];

        return { data: data };
    },

    getId: async (options: any): Promise<IResponse> => {
        const data: IAccessesCategory = {
            "belonging_to": "<Branch>",
            "child": "<AccessesCategory>",
            "id": "<Id>",
            "label": "<string>",
        };

        return { data: data };
    },
};