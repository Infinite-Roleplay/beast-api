import { IAccess } from "./access.model";
import { IRank } from "./rank.model";

export interface IMember {
    uuid: string;
    discordId?: string;
    steamId64?: string;
    rpname?: string;
    money: number;
    rank?: IRank | null;
    accesses?: IAccess[] | null;
}