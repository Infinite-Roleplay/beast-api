import { ISubscription } from "../utils/interfaces/models/subscription.model";
import { IResponse } from "../utils/interfaces/response.interface";

export default {
    getSubscriptions: async (options: any): Promise<IResponse> => {
        const data: ISubscription[] = [{
            "id": "<Id>",
            "member_uuid": "<UUID>",
            "start_at": "<string>",
            "end_at": "<string>",
            "type": "<integer>",
        }];

        return { data: data };
    },

    getId: async (options: any): Promise<IResponse> => {
        const data: ISubscription = {
            "id": "<Id>",
            "member_uuid": "<UUID>",
            "start_at": "<string>",
            "end_at": "<string>",
            "type": "<integer>",
        };

        return { data: data };
    },
};