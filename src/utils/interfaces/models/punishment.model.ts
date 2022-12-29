import { IMember } from "./member.model";
import { IPlatform } from "./platform.model";

export interface IPunishment {
    id: number;
    target: IMember | null;
    by: IMember | null;
    reason: string;
    duration?: number;
    givedOn: IPlatform | null;
    type: number;
}