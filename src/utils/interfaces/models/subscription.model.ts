import { IMember } from "./member.model";

export interface ISubscription {
    id: number;
    member: IMember | null;
    startAt: EpochTimeStamp;
    endAt?: EpochTimeStamp;
    type: number;
}