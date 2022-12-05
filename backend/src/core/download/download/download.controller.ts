import { Controller } from '@nestjs/common';
import {
    Get,
    Res,
    StreamableFile,
    UseInterceptors,
} from '@nestjs/common';
import { DownloadService } from './download.service';
import { Response } from 'express';
@Controller('download')

@Controller('download')
export class DownloadController {

    constructor(private readonly downloadService: DownloadService) {}


    @Get('streamable')
    streamable(@Res({ passthrough: true }) response: Response) {
        const file = this.downloadService.fileStream();
        // or
        // const file = this.downloadService.fileBuffer();
        return new StreamableFile(file); // 👈 supports Buffer and Stream
    }
}
