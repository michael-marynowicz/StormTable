import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DocumentModel} from "../../models/document.model";
import {MeetingService} from "../../services/meeting.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MeetingModel} from "../../models/meeting.model";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-meeting-page',
  templateUrl: './meeting-page.component.html',
  styleUrls: ['./meeting-page.component.less']
})
export class MeetingPageComponent implements OnInit {
  meeting?: MeetingModel;
  meetingId!: string;

  parent?: string;

  documents?: DocumentModel[];

  constructor(private meetingService: MeetingService, private aroute: ActivatedRoute, private router: Router) {
    aroute.params.subscribe(_ => {
      const meetingId = aroute.snapshot.paramMap.get('meetingId');
      if (!meetingId)
        throw "Meeting id not found."
      this.meetingId = meetingId;
    })

    aroute.queryParams.subscribe(_ => {
      this.parent = aroute.snapshot.queryParamMap.get('parent') || undefined;
      this.loadData();
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.meetingService.getMeeting(this.meetingId).then(meeting => {
      this.meeting = meeting
      this.documents = this.meetingService.getDocuments(this.meeting, this.parent)
    });
  }

  documentClicked(document: DocumentModel) {
    console.log("Document clicked", document)
    if (document.type === "DIRECTORY") {
      this.router.navigate([`/meetings/${this.meetingId}`], {queryParams: {parent: document.name}});
    } else {
      saveAs(document.url, document.name);
    }
  }

  back() {
    if (this.parent) {
      this.router.navigate([`/meetings/${this.meetingId}`], {queryParams: {parent: undefined}});
    }
  }
}
