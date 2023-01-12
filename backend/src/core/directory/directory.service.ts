import {Injectable} from "@nestjs/common";
import * as fs from "fs";

Injectable()

export class DirectoryService {
    createDirectory(path: string) {
        if (!fs.existsSync(path)) fs.mkdirSync(path);
        else {
            var acc = 1;
            var dir = './dir' + acc;
            while (fs.existsSync(dir)) {
                dir = './dir' + (++acc);

            }
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        }
    }
}