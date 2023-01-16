import {Body, Controller, Param, Post} from '@nestjs/common';
import {MeetingService} from "../../core/meeting/meeting.service";
import {SessionService} from "../../core/session/session.service";

@Controller('document')
export class DocumentController {

    constructor(private meetingService: MeetingService) {
    }

    @Post(':id/owner')
    setOwner(@Param('id') id: string, @Body() body: {owner: string}) {
        console.log("Setting owner of document " + id + " to " + body.owner);
        this.meetingService.setDocumentOwner(id, body.owner);
    }
}
