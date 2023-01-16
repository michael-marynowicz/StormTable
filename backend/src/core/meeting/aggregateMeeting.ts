import MeetingModel from "../models/meeting.model";
import aggregateDocument from "../document/aggregateDocument";

export default  function(meeting: MeetingModel) {
    return Object.assign(meeting, {
        documents: meeting.documents.map(d => aggregateDocument(d))
    });
}