import { IAccess } from "./models/access.model";
import { IAccessesCategory } from "./models/accessesCategory.model";
import { IAccreditation } from "./models/accreditation.model";
import { IBranch } from "./models/branch.model";
import { IMember } from "./models/member.model";
import { IPlatform } from "./models/platform.model";
import { IPunishment } from "./models/punishment.model";
import { IRank } from "./models/rank.model";
import { ISubscription } from "./models/subscription.model";

export interface IResponse {
    data: IAccess | IAccessesCategory | IAccreditation | IBranch | IMember | IPlatform | IPunishment | IRank | ISubscription;
    status?: number;
}