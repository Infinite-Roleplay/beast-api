import { IAccessesCategory } from "./accessesCategory.model";
import { IAccreditation } from "./accreditation.model";

type color = [number, number, number];

export interface IAccess {
    id: number;
    label: string;
    accreditation?: IAccreditation | null;
    category: IAccessesCategory | null;
    color: color;
    description?: string;
    emoji: string;
    playermodels: string[];
}