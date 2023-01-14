import MeetingBackend from '../../../../backend/src/core/models/meeting.model';
import {DocumentModel} from "./document.model";

export type MeetingModel = MeetingBackend & { documents: DocumentModel[] };
