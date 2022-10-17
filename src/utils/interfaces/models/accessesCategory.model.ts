import { IBranch } from "./branch.model";

export interface IAccessesCategory {
    id: number;
    label: string;
    belongTo: IBranch | null;
    child?: IAccessesCategory | null;
}