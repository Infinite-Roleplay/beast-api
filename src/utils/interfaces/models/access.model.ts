import { IAccessesCategory } from "./accessesCategory.model";
import { IAccreditation } from "./accreditation.model";
import { IBranch } from "./branch.model";

type color = [number, number, number];

export interface IRole {
    id: string;
    on: IBranch | null;
}

export interface IAccess {
    id: number;
    label: string;
    accreditation?: IAccreditation | null;
    category: IAccessesCategory | null;
    color: color;
    description?: string;
    emoji: string;
    playermodels: string[];
    roles: IRole[];
    prefix?: string;
    suffix?: string;
}