import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class DownloadService {
    constructor() {
        // create connection to your file storage
    }

    fileStream() {
        //const filePath = path.join(process.cwd(), 'package.json')
        const filePath = path.resolve('./files', '1670228717253.pak')
        return createReadStream(filePath);
    }
}
