import DatabaseUtil from "../utils/database.util";
import { sha512 } from "js-sha512";

const possibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export default class VerificationService {
    static async generate(discordId: string): Promise<string> {
        let key: string;
        let exist: any[];

        do {
            key = this._randonKey();
            exist = await DatabaseUtil.query("SELECT 1 FROM verification WHERE hashed_key = ?", [sha512(key)]).catch(() => false);
        } while(exist.length != 0);

        await DatabaseUtil.query("UPDATE verification SET active=0 WHERE discord_id=?", [discordId]);
        await DatabaseUtil.query("INSERT INTO verification (discord_id, hashed_key) VALUES(?,?)", [discordId, sha512(key)]);

        return key;
    }

    private static _randonKey(): string {
        let key: string = "";

        for(let i = 0; i < 16; i++) key += possibilities[this._random(possibilities.length)];
        key += '-';
        for(let i = 0; i < 4; i++) key += possibilities[this._random(possibilities.length)];
        key += '-';
        for(let i = 0; i < 4; i++) key += possibilities[this._random(possibilities.length)];
        key += '-';
        for(let i = 0; i < 48; i++) key += possibilities[this._random(possibilities.length)];

        return key;
    }

    private static _random(max: number): number{
        return Math.floor(Math.random()*max);
    }
};