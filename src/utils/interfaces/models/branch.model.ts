import { IMember } from "./member.model";

export interface IBranch {
    id: number;
    label: string;
    discordServerId: string;
    director?: IMember | null;
}