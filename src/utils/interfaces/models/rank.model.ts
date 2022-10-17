export interface IRank {
    id: number;
    label: string;
    child?: IRank | null;
    permissions: string[] | null;
}